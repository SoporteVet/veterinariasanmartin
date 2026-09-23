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
                <svg
                    className="dog-contact__illustration"
                    viewBox="0 0 280 300"
                    role="img"
                    aria-labelledby="dog-contact-dog-title dog-contact-dog-description"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <title id="dog-contact-dog-title">Golden retriever veterinario amistoso</title>
                    <desc id="dog-contact-dog-description">
                        Un golden retriever alegre con bata, estetoscopio, collar azul y placa con una huella saluda desde la esquina.
                    </desc>

                    <defs>
                        <linearGradient id="dog-contact-coat" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ffffff" />
                            <stop offset="100%" stopColor="#eaf7fc" />
                        </linearGradient>
                        <linearGradient id="dog-contact-fur" x1="0.15" y1="0" x2="0.85" y2="1">
                            <stop offset="0%" stopColor="#ffd477" />
                            <stop offset="48%" stopColor="#e9a23b" />
                            <stop offset="100%" stopColor="#c87520" />
                        </linearGradient>
                        <linearGradient id="dog-contact-ear-fur" x1="0" y1="0" x2="0.8" y2="1">
                            <stop offset="0%" stopColor="#e7a13a" />
                            <stop offset="100%" stopColor="#ad5c19" />
                        </linearGradient>
                        <radialGradient id="dog-contact-muzzle" cx="50%" cy="35%" r="70%">
                            <stop offset="0%" stopColor="#fff1c9" />
                            <stop offset="100%" stopColor="#efc681" />
                        </radialGradient>
                        <filter id="dog-contact-shadow" x="-30%" y="-30%" width="160%" height="180%">
                            <feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="#0a3566" floodOpacity="0.22" />
                        </filter>
                        <clipPath id="dog-contact-peek">
                            <rect x="8" y="4" width="264" height="290" rx="22" />
                        </clipPath>
                    </defs>

                    <g clipPath="url(#dog-contact-peek)" filter="url(#dog-contact-shadow)">
                        <path
                            className="dog-contact__tail dog-contact__tail--wag"
                            d="M216 253 C236 232 254 215 274 227 C260 231 269 238 277 240 C268 247 263 253 269 259 C254 267 240 272 228 269 C241 259 233 250 216 266 Z"
                            fill="url(#dog-contact-fur)"
                            stroke="#a85b1b"
                            strokeWidth="4"
                            strokeLinejoin="round"
                        />

                        <path
                            d="M69 300 C69 242 89 210 139 207 C191 204 218 239 220 300 Z"
                            fill="url(#dog-contact-coat)"
                            stroke="#c6e8f5"
                            strokeWidth="4"
                        />
                        <path d="M139 218 L139 299" fill="none" stroke="#c6e8f5" strokeWidth="4" />
                        <path d="M112 217 L137 243 L96 256" fill="#ffffff" stroke="#c6e8f5" strokeWidth="3" />
                        <path d="M166 216 L141 243 L183 256" fill="#ffffff" stroke="#c6e8f5" strokeWidth="3" />
                        <circle cx="151" cy="264" r="4" fill="#1a6fd4" />
                        <circle cx="151" cy="283" r="4" fill="#1a6fd4" />

                        <g className="dog-contact__head dog-contact__head--tilt">
                            <g className="dog-contact__ear dog-contact__ear--left">
                                <path
                                    d="M96 73 C77 50 56 51 45 69 C33 89 38 123 53 150 L62 165 L67 151 L74 169 L81 150 L88 160 L96 140 C103 121 106 99 109 82 Z"
                                    fill="url(#dog-contact-ear-fur)"
                                    stroke="#98501a"
                                    strokeWidth="4"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M84 72 C62 75 52 92 57 119 C60 135 66 144 73 151"
                                    fill="none"
                                    stroke="#f4bd5a"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    opacity="0.8"
                                />
                            </g>
                            <g className="dog-contact__ear dog-contact__ear--right">
                                <path
                                    d="M182 73 C201 50 222 51 233 69 C245 89 240 123 225 150 L216 165 L211 151 L204 169 L197 150 L190 160 L182 140 C175 121 172 99 169 82 Z"
                                    fill="url(#dog-contact-ear-fur)"
                                    stroke="#98501a"
                                    strokeWidth="4"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M194 72 C216 75 226 92 221 119 C218 135 212 144 205 151"
                                    fill="none"
                                    stroke="#f4bd5a"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    opacity="0.8"
                                />
                            </g>
                            <path
                                d="M139 27 C101 27 75 49 70 87 C66 108 69 137 77 157 L71 166 L83 167 L78 178 L92 176 C101 204 117 221 139 224 C162 221 178 204 187 176 L201 178 L195 167 L207 166 L201 157 C209 136 212 108 208 87 C202 49 177 27 139 27 Z"
                                fill="url(#dog-contact-fur)"
                                stroke="#98501a"
                                strokeWidth="4"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M87 78 C94 48 114 35 139 34 C164 35 184 48 191 78 C176 65 161 61 139 62 C117 61 102 65 87 78 Z"
                                fill="#ffda80"
                                opacity="0.8"
                            />
                            <path
                                d="M83 139 C88 163 98 179 115 190 L107 169 L125 183 L119 158 Z"
                                fill="#f3b64d"
                                opacity="0.7"
                            />
                            <path
                                d="M195 139 C190 163 180 179 163 190 L171 169 L153 183 L159 158 Z"
                                fill="#d88928"
                                opacity="0.65"
                            />
                            <path
                                d="M94 81 C105 72 118 72 128 80"
                                fill="none"
                                stroke="#a65d1c"
                                strokeWidth="5"
                                strokeLinecap="round"
                            />
                            <path
                                d="M150 80 C160 72 173 72 184 81"
                                fill="none"
                                stroke="#a65d1c"
                                strokeWidth="5"
                                strokeLinecap="round"
                            />

                            <g className="dog-contact__eyes dog-contact__eyes--blink">
                                <ellipse cx="109" cy="105" rx="14" ry="17" fill="#fffaf0" />
                                <ellipse cx="169" cy="105" rx="14" ry="17" fill="#fffaf0" />
                                <ellipse cx="111" cy="107" rx="9" ry="12" fill="#231810" />
                                <ellipse cx="167" cy="107" rx="9" ry="12" fill="#231810" />
                                <circle cx="114" cy="102" r="4" fill="#ffffff" />
                                <circle cx="170" cy="102" r="4" fill="#ffffff" />
                                <circle cx="107" cy="112" r="2" fill="#8b5d32" />
                                <circle cx="163" cy="112" r="2" fill="#8b5d32" />
                            </g>

                            <path
                                d="M139 119 C120 117 102 128 99 148 C96 166 108 180 125 181 C132 188 146 188 153 181 C170 180 182 166 179 148 C176 128 158 117 139 119 Z"
                                fill="url(#dog-contact-muzzle)"
                            />
                            <path
                                d="M112 155 C117 166 126 171 139 171 C152 171 161 166 166 155 C166 180 155 195 139 197 C123 195 112 180 112 155 Z"
                                fill="#57271f"
                                stroke="#7f401f"
                                strokeWidth="3"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M125 176 C132 171 146 171 153 176 C152 189 146 195 139 196 C132 195 126 189 125 176 Z"
                                fill="#f06f7c"
                            />
                            <path
                                d="M139 176 L139 193"
                                fill="none"
                                stroke="#c64f62"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M117 136 C117 124 161 124 161 136 C161 148 149 154 139 154 C129 154 117 148 117 136 Z"
                                fill="#211915"
                                stroke="#130f0d"
                                strokeWidth="3"
                            />
                            <path
                                d="M124 132 C132 128 146 128 153 132"
                                fill="none"
                                stroke="#5c514a"
                                strokeWidth="3"
                                strokeLinecap="round"
                                opacity="0.75"
                            />
                            <path
                                d="M139 154 C137 162 127 166 118 159 M139 154 C141 162 151 166 160 159"
                                fill="none"
                                stroke="#6f3f20"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </g>

                        <path
                            d="M92 194 C97 216 116 227 139 227 C162 227 181 216 186 194"
                            fill="none"
                            stroke="#1a6fd4"
                            strokeWidth="13"
                            strokeLinecap="round"
                        />
                        <circle cx="139" cy="222" r="17" fill="#54c8f0" stroke="#1a6fd4" strokeWidth="4" />
                        <g className="dog-contact__paw-tag" fill="#ffffff">
                            <ellipse cx="139" cy="224" rx="6" ry="5" />
                            <circle cx="131" cy="216" r="3" />
                            <circle cx="137" cy="213" r="3" />
                            <circle cx="144" cy="214" r="3" />
                            <circle cx="148" cy="219" r="3" />
                        </g>

                        <path
                            d="M103 236 C91 224 84 210 85 194"
                            fill="none"
                            stroke="#536a7b"
                            strokeWidth="5"
                            strokeLinecap="round"
                        />
                        <path
                            d="M176 236 C188 224 195 210 194 194"
                            fill="none"
                            stroke="#536a7b"
                            strokeWidth="5"
                            strokeLinecap="round"
                        />
                        <circle cx="84" cy="190" r="7" fill="#54c8f0" stroke="#536a7b" strokeWidth="4" />
                        <circle cx="195" cy="190" r="7" fill="#54c8f0" stroke="#536a7b" strokeWidth="4" />
                        <path
                            d="M126 246 C111 246 105 257 105 268"
                            fill="none"
                            stroke="#536a7b"
                            strokeWidth="5"
                            strokeLinecap="round"
                        />
                        <circle cx="104" cy="274" r="8" fill="#54c8f0" stroke="#536a7b" strokeWidth="4" />

                        <path
                            d="M90 299 C91 276 99 261 112 255 C119 274 120 288 119 299 Z"
                            fill="url(#dog-contact-fur)"
                            stroke="#98501a"
                            strokeWidth="4"
                        />
                        <path
                            d="M188 299 C187 276 179 261 166 255 C159 274 158 288 159 299 Z"
                            fill="url(#dog-contact-fur)"
                            stroke="#98501a"
                            strokeWidth="4"
                        />
                    </g>
                </svg>
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
