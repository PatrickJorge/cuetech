// Initialize EmailJS
(function () {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Initialize Lucide icons
lucide.createIcons();

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const menuIcon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    const isOpen = mobileMenu.classList.contains('active');
    menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
    lucide.createIcons();
});

// Project filters
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {

        filterButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact form
const contactForm = document.getElementById('contactForm');
const submitButton = contactForm.querySelector('button[type="submit"]');
const buttonText = submitButton.querySelector('.button-text');
const buttonLoader = submitButton.querySelector('.button-loader');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    buttonText.classList.add('hidden');
    buttonLoader.classList.remove('hidden');

    try {
        await emailjs.sendForm(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            contactForm
        );

        alert('Message sent successfully!');
        contactForm.reset();
    } catch (error) {

        alert('Failed to send message. Please try again.');
    } finally {

        submitButton.disabled = false;
        buttonText.classList.remove('hidden');
        buttonLoader.classList.add('hidden');
    }
});

document.getElementById('currentYear').textContent = new Date().getFullYear();


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {

            mobileMenu.classList.remove('active');
            menuIcon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
});

document.querySelectorAll('.nav-desktop a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {

            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });

    // .mobile-menu
    const menuLinks = document.querySelectorAll('.mobile-menu a');

    menuLinks.forEach((link) => {

        link.addEventListener('click', (e) => {
            e.preventDefault();

            const sectionId = link.getAttribute('href');
            const section = document.querySelector(sectionId);

            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const skills = document.querySelectorAll('.skill');
    const skillDetails = document.querySelectorAll('.skill-detail');

    // Mostrar o primeiro skill por padrão
    skills[0].classList.add('active');
    skillDetails[0].classList.add('active');

    skills.forEach(skill => {
        skill.addEventListener('click', () => {
            // Remove active class de todos
            skills.forEach(s => s.classList.remove('active'));
            skillDetails.forEach(d => d.classList.remove('active'));

            // Adiciona active class ao item clicado
            skill.classList.add('active');
            const skillType = skill.getAttribute('data-skill');
            document.querySelector(`[data-detail="${skillType}"]`).classList.add('active');
        });
    });
});

// Gerenciamento do tema
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelector('.theme-light').style.display = isDark ? 'none' : 'block';
    document.querySelector('.theme-dark').style.display = isDark ? 'block' : 'none';
}

// Inicialização do tema
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    updateThemeIcon();

    // Event listener para o botão de tema
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
});

// Função para verificar elementos visíveis e adicionar animações
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target); // Para a animação acontecer apenas uma vez
            }
        });
    }, {
        threshold: 0.1, // Elemento será animado quando 10% dele estiver visível
        rootMargin: '0px' // Margem adicional para trigger da animação
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Inicialize as animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
});
