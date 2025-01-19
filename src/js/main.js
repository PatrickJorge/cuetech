// Arquivo principal que importa e inicializa todos os módulos
import { initTheme } from './theme.js';
import { initAnimations } from './animations.js';
import { initNavigation } from './navigation.js';
import { initSkills } from './skills.js';
import { initContactForm } from './contact.js';
import { initProjects } from './projects.js';

// Inicialização do EmailJS
(function () {
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// Inicialização dos ícones Lucide
lucide.createIcons();

// Inicialização de todos os módulos
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initAnimations();
    initNavigation();
    initSkills();
    initContactForm();
    initProjects();

    // Atualiza o ano no footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}); 