// Gerenciamento das skills
export function initSkills() {
    const skills = document.querySelectorAll('.skill');
    const skillDetails = document.querySelectorAll('.skill-detail');

    // Mostrar o primeiro skill por padrão
    skills[0]?.classList.add('active');
    skillDetails[0]?.classList.add('active');

    skills.forEach(skill => {
        skill.addEventListener('click', () => handleSkillClick(skill, skills, skillDetails));
    });
}

function handleSkillClick(selectedSkill, allSkills, allDetails) {
    // Remove active class de todos
    allSkills.forEach(s => s.classList.remove('active'));
    allDetails.forEach(d => d.classList.remove('active'));

    // Adiciona active class ao item clicado
    selectedSkill.classList.add('active');
    const skillType = selectedSkill.getAttribute('data-skill');
    document.querySelector(`[data-detail="${skillType}"]`)?.classList.add('active');
} 