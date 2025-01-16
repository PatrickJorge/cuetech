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
