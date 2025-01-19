// Gerenciamento de animações
export function initAnimations() {
    handleScrollAnimations();
    initTypewriter();
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

function initTypewriter() {
    const text = "Construindo experiências digitais";
    const element = document.querySelector('.typewriter');

    if (!element) return;

    // Limpa o texto original
    element.textContent = '';

    let index = 0;

    // Aguarda um momento para iniciar a digitação
    setTimeout(() => {
        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, 100); // Velocidade da digitação
            } else {
                // Remove a classe typewriter após completar a digitação
                element.classList.remove('typewriter');
            }
        }
        type();
    }, 500); // Delay inicial
} 