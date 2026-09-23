(function () {
    const fab = document.getElementById('contact-fab');
    const toggle = document.getElementById('contact-fab-toggle');
    const menu = document.getElementById('contact-fab-menu');
    const botBtn = document.getElementById('contact-fab-bot');

    if (!fab || !toggle || !menu) return;

    function closeMenu() {
        fab.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
    }

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = fab.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menu.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    document.addEventListener('click', function (e) {
        if (!fab.contains(e.target)) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });

    function openMartinaChat() {
        closeMenu();
        const tryOpen = function () {
            const launcher = document.getElementById('martina-chat-launcher');
            if (launcher) {
                launcher.click();
                return true;
            }
            return false;
        };

        if (!tryOpen()) {
            let attempts = 0;
            const interval = setInterval(function () {
                attempts += 1;
                if (tryOpen() || attempts >= 20) {
                    clearInterval(interval);
                }
            }, 150);
        }
    }

    if (botBtn) {
        botBtn.addEventListener('click', openMartinaChat);
    }
})();
