// Gerenciamento da navegação
export function initNavigation() {
    initMobileMenu();
    initSmoothScroll();
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const isOpen = mobileMenu.classList.contains('active');
        menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        lucide.createIcons();
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', handleSmoothScroll);
    });

    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', handleMobileMenuClick);
    });
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

function handleMobileMenuClick(e) {
    e.preventDefault();
    const sectionId = this.getAttribute('href');
    const section = document.querySelector(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
} 