// Gerenciamento do formulário de contato
export function initContactForm() {
    const contactForm = document.getElementById('contactForm');
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

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Desabilita o botão e mostra loading
        submitButton.disabled = true;
        buttonText.classList.add('hidden');
        buttonLoader.classList.remove('hidden');

        try {
            // Envia o email
            await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm);
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao enviar mensagem. Tente novamente.');
        }

        // Reabilita o botão e esconde loading
        submitButton.disabled = false;
        buttonText.classList.remove('hidden');
        buttonLoader.classList.add('hidden');
    });
} 