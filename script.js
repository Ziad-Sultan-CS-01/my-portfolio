/* ==========================================================================
   INTERACTIVE PORTFOLIO ENGINE - ZIAD FARAG (2026)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.card');

    // 1. Toast Notification System
    function showToast(message, type = 'success', duration = 4000) {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : type === 'info' ? 'toast-info' : ''}`;

        let icon = '<i class="fa-solid fa-circle-check"></i>';
        if (type === 'error') {
            icon = '<i class="fa-solid fa-circle-xmark"></i>';
        } else if (type === 'warning') {
            icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
        } else if (type === 'info') {
            icon = '<i class="fa-solid fa-circle-info"></i>';
        }

        toast.innerHTML = `${icon}<span>${message}</span>`;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'none';
            toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            toast.style.opacity = '0';
            toast.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, duration);
    }

    // 2. Scroll Effects (Header and Active Section Links)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll spy active highlights
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // 3. Mobile Sidebar Toggle Menu
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = mobileToggle.querySelector('i');
        if (navMenu.classList.contains('open')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars-staggered';
        }
    });

    // Close mobile menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            const icon = mobileToggle.querySelector('i');
            icon.className = 'fa-solid fa-bars-staggered';
        });
    });

    // 4. Interactive Hover Cursor Glow Effect for Cards
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Welcome Toast
    setTimeout(() => {
        showToast('Welcome to Ziad Farag\'s Interactive Space!', 'info');
    }, 1000);
});
/* ==========================================================================
   10. JS INTEGRATION STYLES (HEADER, TOASTS & GLOW)
   ========================================================================== */

/* تأثير الـ Header عند السكرول */
.header.scrolled {
    background: rgba(10, 12, 16, 0.95);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid rgba(0, 242, 254, 0.2);
}

/* زر الموبايل لما القائمة تفتح */
.nav-menu.open {
    display: flex !important;
    flex-direction: column;
    animation: fadeInDown 0.3s ease forwards;
}

@keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* نظام الـ Toast Notifications */
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.toast {
    background: #161b26;
    border-left: 4px solid var(--accent-cyan);
    color: var(--text-main);
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
    animation: slideIn 0.3s ease forwards;
}

.toast i { color: var(--accent-cyan); font-size: 1.1rem; }
.toast-error { border-left-color: #ff4a4a; }
.toast-error i { color: #ff4a4a; }
.toast-warning { border-left-color: #ffb700; }
.toast-warning i { color: #ffb700; }
.toast-info { border-left-color: var(--accent-violet); }
.toast-info i { color: var(--accent-violet); }

@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

/* تأثير الـ Interactive Card Glow Dynamic */
.card {
    position: relative;
}
.card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    border-radius: inherit;
    background: radial-gradient(800px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(0, 242, 254, 0.06), transparent 40%);
    z-index: 1;
    pointer-events: none;
}
