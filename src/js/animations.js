// Gerenciamento de animações
export function initAnimations() {
    handleScrollAnimations();
}

function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    elements.forEach(element => observer.observe(element));
} 