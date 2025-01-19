// Gerenciamento dos projetos
export function initProjects() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => handleFilterClick(button, filterButtons, projectCards));
    });
}

function handleFilterClick(selectedButton, allButtons, projectCards) {
    allButtons.forEach(btn => btn.classList.remove('active'));
    selectedButton.classList.add('active');

    const filter = selectedButton.getAttribute('data-filter');
    filterProjects(projectCards, filter);
}

function filterProjects(projects, filter) {
    projects.forEach(card => {
        const shouldShow = filter === 'all' || card.getAttribute('data-category') === filter;
        card.style.display = shouldShow ? 'block' : 'none';
    });
} 