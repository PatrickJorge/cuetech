// Gerenciamento do formulário de contato
export function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    if (!contactForm) return;

    // Substitua XXXX pelos seus IDs copiados do EmailJS
    const PUBLIC_KEY = "MnJWWEmwfdMT-oaMP"; // Sua Public Key
    const SERVICE_ID = "service_et6bp7k"; // Seu Service ID
    const TEMPLATE_ID = "template_d67310c"; // Seu Template ID

    // Inicializa o EmailJS
    emailjs.init(PUBLIC_KEY);

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');

    // Função para validar email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Função para mostrar erro no campo
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');

        let errorMessage = formGroup.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            formGroup.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
        input.setAttribute('aria-invalid', 'true');
    }

    // Função para remover erro do campo
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        input.removeAttribute('aria-invalid');
    }

    // Feedback visual melhorado
    function showFeedback(type, message) {
        const feedback = document.createElement('div');
        feedback.className = `form-feedback ${type} animate-slide-up`;
        feedback.textContent = message;

        const existingFeedback = contactForm.querySelector('.form-feedback');
        if (existingFeedback) {
            existingFeedback.remove();
        }

        contactForm.insertBefore(feedback, contactForm.firstChild);

        setTimeout(() => {
            feedback.classList.add('fade-out');
            setTimeout(() => feedback.remove(), 300);
        }, 5000);
    }

    // Validação de campos melhorada
    function validateField(input) {
        const value = input.value.trim();
        const field = input.closest('.form-group');

        field.classList.remove('error', 'success');

        if (!value) {
            field.classList.add('error');
            field.classList.add('animate-shake');
            setTimeout(() => field.classList.remove('animate-shake'), 500);
            return false;
        }

        if (input.type === 'email' && !isValidEmail(value)) {
            field.classList.add('error');
            return false;
        }

        field.classList.add('success');
        return true;
    }

    // Função para validar todo o formulário
    function validateForm() {
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        return isValid;
    }

    // Função para mostrar o modal
    function showModal() {
        modal.classList.add('active');
        lucide.createIcons(); // Recria os ícones do Lucide
    }

    // Função para fechar o modal
    function closeModal() {
        modal.classList.remove('active');
    }

    // Event listener para o botão de fechar
    modal.querySelector('.modal-close').addEventListener('click', closeModal);

    // Fechar modal ao clicar fora
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Tratamento de erros melhorado
    async function handleSubmit(e) {
        e.preventDefault();

        const isValid = Array.from(contactForm.elements)
            .filter(el => el.tagName !== 'BUTTON')
            .every(validateField);

        if (!isValid) {
            showFeedback('error', 'Por favor, corrija os erros no formulário');
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const buttonText = submitButton.querySelector('.button-text');
        const buttonLoader = submitButton.querySelector('.button-loader');

        try {
            submitButton.disabled = true;
            buttonText.classList.add('hidden');
            buttonLoader.classList.remove('hidden');

            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm);

            showFeedback('success', 'Mensagem enviada com sucesso!');
            contactForm.reset();

            // Limpa classes de validação
            contactForm.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error', 'success');
            });

            showModal();

        } catch (error) {
            console.error('Erro:', error);
            showFeedback('error', 'Erro ao enviar mensagem. Tente novamente.');
        } finally {
            submitButton.disabled = false;
            buttonText.classList.remove('hidden');
            buttonLoader.classList.add('hidden');
        }
    }

    // Event Listeners
    contactForm.addEventListener('submit', handleSubmit);

    contactForm.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            const field = input.closest('.form-group');
            field.classList.remove('error');
        });
    });
} 