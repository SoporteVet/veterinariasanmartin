(function () {
    const rootElement = document.getElementById('dog-contact-root');

    if (
        !rootElement ||
        typeof React === 'undefined' ||
        typeof ReactDOM === 'undefined' ||
        typeof ReactDOM.createRoot !== 'function'
    ) {
        return;
    }

    const { useCallback, useEffect, useRef, useState } = React;
    const CARD_ID = 'dog-contact-card';
    const BUBBLE_DISMISSED_KEY = 'dogContactBubbleDismissed';
    const WHATSAPP_URL =
        'https://api.whatsapp.com/send?phone=50686123030&text=Hola,%20quiero%20solicitar%20informaci%C3%B3n!';
    const FOCUSABLE_SELECTOR =
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function Dog({ isOpen, onToggle, buttonRef }) {
        return (
            <button
                ref={buttonRef}
                className="dog-contact__dog dog-contact__dog--jump"
                type="button"
                aria-label={isOpen ? 'Cerrar opciones de contacto' : 'Abrir opciones de contacto'}
                aria-expanded={isOpen}
                aria-controls={CARD_ID}
                onClick={onToggle}
            >
                <img
                    className="dog-contact__illustration"
                    src="img/dog-contact.png?v=1"
                    alt=""
                />
            </button>
        );
    }

    function SpeechBubble({ isOpen, onDismiss, onToggle }) {
        return (
            <div className="dog-contact__speech-bubble" role="status">
                <button
                    className="dog-contact__speech-action"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={CARD_ID}
                    onClick={onToggle}
                >
                    <span className="dog-contact__speech-greeting">¡Hola! ¿Hablamos?</span>
                    <span className="dog-contact__speech-cta">Contáctanos</span>
                </button>
                <button
                    className="dog-contact__speech-close"
                    type="button"
                    aria-label="Cerrar mensaje de contacto"
                    onClick={onDismiss}
                >
                    <span aria-hidden="true">×</span>
                </button>
            </div>
        );
    }

    function ContactCard({ isOpen, onClose, onMartina, cardRef }) {
        return (
            <div
                ref={cardRef}
                id={CARD_ID}
                className={`dog-contact__card${isOpen ? ' is-open' : ''}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="dog-contact-card-title"
                aria-describedby="dog-contact-card-description"
                hidden={!isOpen}
            >
                <div className="dog-contact__card-header">
                    <div>
                        <h2 id="dog-contact-card-title" className="dog-contact__card-title">
                            Contáctanos
                        </h2>
                        <p id="dog-contact-card-description" className="dog-contact__card-subtitle">
                            Estamos listos para ayudarte a cuidar a tu mascota.
                        </p>
                    </div>
                    <button
                        className="dog-contact__card-close"
                        type="button"
                        aria-label="Cerrar opciones de contacto"
                        onClick={onClose}
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                </div>

                <div className="dog-contact__card-actions">
                    <a
                        className="dog-contact__action dog-contact__action--whatsapp"
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="dog-contact__action-icon">
                            <i className="fab fa-whatsapp" aria-hidden="true" />
                        </span>
                        <span>Escríbenos por WhatsApp</span>
                    </a>
                    <button
                        className="dog-contact__action dog-contact__action--martina"
                        type="button"
                        onClick={onMartina}
                    >
                        <span className="dog-contact__action-icon">
                            <i className="fas fa-paw" aria-hidden="true" />
                        </span>
                        <span>Chat con Martina</span>
                    </button>
                </div>
            </div>
        );
    }

    function DogContact() {
        const [isCardOpen, setIsCardOpen] = useState(false);
        const [isBubbleVisible, setIsBubbleVisible] = useState(false);
        const widgetRef = useRef(null);
        const cardRef = useRef(null);
        const dogButtonRef = useRef(null);
        const martinaRetryRef = useRef(null);
        const martinaFocusRetryRef = useRef(null);
        const martinaRestoreFocusFrameRef = useRef(null);
        const martinaPanelObserverRef = useRef(null);
        const openerRef = useRef(null);
        const wasCardOpenRef = useRef(false);
        const restoreFocusOnCloseRef = useRef(true);

        const closeCard = useCallback((options = {}) => {
            restoreFocusOnCloseRef.current = options.restoreFocus !== false;
            setIsCardOpen(false);
        }, []);

        const toggleCard = useCallback(
            (event) => {
                if (!isCardOpen) {
                    openerRef.current = event.currentTarget;
                    restoreFocusOnCloseRef.current = true;
                }

                setIsCardOpen((isOpen) => !isOpen);
            },
            [isCardOpen]
        );

        const dismissBubble = useCallback(() => {
            setIsBubbleVisible(false);

            try {
                window.sessionStorage.setItem(BUBBLE_DISMISSED_KEY, 'true');
            } catch (error) {
                // El widget sigue funcionando si el navegador bloquea sessionStorage.
            }
        }, []);

        const watchMartinaPanel = useCallback((panel) => {
            if (martinaPanelObserverRef.current) {
                martinaPanelObserverRef.current.disconnect();
            }

            let wasOpen = panel.classList.contains('is-open');

            const syncPanelState = () => {
                const isOpen = panel.classList.contains('is-open');
                const didClose = wasOpen && !isOpen;

                panel.toggleAttribute('inert', !isOpen);
                panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
                panel.setAttribute('aria-modal', 'true');
                wasOpen = isOpen;

                if (didClose && dogButtonRef.current) {
                    let attempts = 0;

                    const restoreDogFocus = () => {
                        const button = dogButtonRef.current;

                        if (!button || panel.classList.contains('is-open')) {
                            martinaRestoreFocusFrameRef.current = null;
                            return;
                        }

                        if (window.getComputedStyle(button).visibility === 'visible') {
                            button.focus();
                            martinaRestoreFocusFrameRef.current = null;
                            return;
                        }

                        attempts += 1;

                        if (attempts < 30) {
                            martinaRestoreFocusFrameRef.current =
                                window.requestAnimationFrame(restoreDogFocus);
                        } else {
                            martinaRestoreFocusFrameRef.current = null;
                        }
                    };

                    martinaRestoreFocusFrameRef.current =
                        window.requestAnimationFrame(restoreDogFocus);
                }
            };

            const observer = new MutationObserver(syncPanelState);
            observer.observe(panel, { attributes: true, attributeFilter: ['class'] });
            martinaPanelObserverRef.current = observer;
            syncPanelState();
        }, []);

        const openMartinaChat = useCallback(() => {
            closeCard({ restoreFocus: false });

            if (martinaRetryRef.current) {
                window.clearInterval(martinaRetryRef.current);
                martinaRetryRef.current = null;
            }

            if (martinaFocusRetryRef.current) {
                window.clearInterval(martinaFocusRetryRef.current);
                martinaFocusRetryRef.current = null;
            }

            const focusMartinaPanel = () => {
                let attempts = 0;

                const tryFocus = () => {
                    const panel = document.getElementById('martina-chat-panel');
                    const target = panel?.querySelector(
                        '#martina-chat-close, button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                    );

                    if (!panel?.classList.contains('is-open') || !target) {
                        return false;
                    }

                    watchMartinaPanel(panel);
                    target.focus();
                    return true;
                };

                if (tryFocus()) {
                    return;
                }

                martinaFocusRetryRef.current = window.setInterval(() => {
                    attempts += 1;

                    if (tryFocus() || attempts >= 20) {
                        window.clearInterval(martinaFocusRetryRef.current);
                        martinaFocusRetryRef.current = null;
                    }
                }, 50);
            };

            const clickLauncher = () => {
                const launcher = document.getElementById('martina-chat-launcher');

                if (!launcher) {
                    return false;
                }

                launcher.click();
                focusMartinaPanel();
                return true;
            };

            if (clickLauncher()) {
                return;
            }

            let attempts = 0;
            martinaRetryRef.current = window.setInterval(() => {
                attempts += 1;

                if (clickLauncher() || attempts >= 20) {
                    window.clearInterval(martinaRetryRef.current);
                    martinaRetryRef.current = null;
                }
            }, 150);
        }, [closeCard, watchMartinaPanel]);

        useEffect(() => {
            document.body.classList.add('dog-contact-mounted');

            return () => {
                document.body.classList.remove('dog-contact-mounted');
            };
        }, []);

        useEffect(() => {
            let wasDismissed = false;

            try {
                wasDismissed = window.sessionStorage.getItem(BUBBLE_DISMISSED_KEY) === 'true';
            } catch (error) {
                // Si sessionStorage no está disponible, el mensaje puede mostrarse normalmente.
            }

            if (wasDismissed) {
                return undefined;
            }

            const timer = window.setTimeout(() => {
                setIsBubbleVisible(true);
            }, 3000);

            return () => {
                window.clearTimeout(timer);
            };
        }, []);

        useEffect(() => {
            if (!isCardOpen) {
                if (wasCardOpenRef.current) {
                    wasCardOpenRef.current = false;
                    const opener = openerRef.current;
                    const shouldRestoreFocus = restoreFocusOnCloseRef.current;
                    restoreFocusOnCloseRef.current = true;

                    if (
                        shouldRestoreFocus &&
                        opener &&
                        opener.isConnected &&
                        typeof opener.focus === 'function'
                    ) {
                        opener.focus();
                    }
                }

                return undefined;
            }

            wasCardOpenRef.current = true;
            const frame = window.requestAnimationFrame(() => {
                const firstControl = cardRef.current?.querySelector(FOCUSABLE_SELECTOR);

                if (firstControl) {
                    firstControl.focus();
                }
            });

            return () => {
                window.cancelAnimationFrame(frame);
            };
        }, [isCardOpen]);

        useEffect(() => {
            if (!isCardOpen) {
                return undefined;
            }

            const handleOutsideClick = (event) => {
                if (widgetRef.current && !widgetRef.current.contains(event.target)) {
                    closeCard({ restoreFocus: false });
                }
            };

            const handleKeyDown = (event) => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    closeCard();
                    return;
                }

                if (event.key !== 'Tab' || !cardRef.current) {
                    return;
                }

                const controls = Array.from(
                    cardRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
                );

                if (controls.length === 0) {
                    event.preventDefault();
                    return;
                }

                const firstControl = controls[0];
                const lastControl = controls[controls.length - 1];
                const activeElement = document.activeElement;
                const focusIsOutside = !cardRef.current.contains(activeElement);

                if (event.shiftKey && (activeElement === firstControl || focusIsOutside)) {
                    event.preventDefault();
                    lastControl.focus();
                } else if (!event.shiftKey && (activeElement === lastControl || focusIsOutside)) {
                    event.preventDefault();
                    firstControl.focus();
                }
            };

            document.addEventListener('pointerdown', handleOutsideClick);
            document.addEventListener('keydown', handleKeyDown);

            return () => {
                document.removeEventListener('pointerdown', handleOutsideClick);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }, [closeCard, isCardOpen]);

        useEffect(() => {
            return () => {
                if (martinaRetryRef.current) {
                    window.clearInterval(martinaRetryRef.current);
                }

                if (martinaFocusRetryRef.current) {
                    window.clearInterval(martinaFocusRetryRef.current);
                }

                if (martinaRestoreFocusFrameRef.current) {
                    window.cancelAnimationFrame(martinaRestoreFocusFrameRef.current);
                }

                if (martinaPanelObserverRef.current) {
                    martinaPanelObserverRef.current.disconnect();
                }
            };
        }, []);

        return (
            <aside
                ref={widgetRef}
                className={`dog-contact${isCardOpen ? ' is-open' : ''}`}
                aria-label="Opciones de contacto"
            >
                {isBubbleVisible && (
                    <SpeechBubble
                        isOpen={isCardOpen}
                        onDismiss={dismissBubble}
                        onToggle={toggleCard}
                    />
                )}
                <ContactCard
                    isOpen={isCardOpen}
                    onClose={closeCard}
                    onMartina={openMartinaChat}
                    cardRef={cardRef}
                />
                <Dog
                    isOpen={isCardOpen}
                    onToggle={toggleCard}
                    buttonRef={dogButtonRef}
                />
            </aside>
        );
    }

    ReactDOM.createRoot(rootElement).render(<DogContact />);
})();
