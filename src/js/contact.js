// Gerenciamento do formulário de contato
export function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const buttonLoader = submitButton.querySelector('.button-loader');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleFormSubmit(contactForm, submitButton, buttonText, buttonLoader);
    });
}

async function handleFormSubmit(form, button, buttonText, buttonLoader) {
    button.disabled = true;
    buttonText.classList.add('hidden');
    buttonLoader.classList.remove('hidden');

    try {
        await emailjs.sendForm(
            'YOUR_SERVICE_ID',
            'YOUR_TEMPLATE_ID',
            form
        );
        alert('Mensagem enviada com sucesso!');
        form.reset();
    } catch (error) {
        alert('Falha ao enviar mensagem. Por favor, tente novamente.');
    } finally {
        button.disabled = false;
        buttonText.classList.remove('hidden');
        buttonLoader.classList.add('hidden');
    }
} 