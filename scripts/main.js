const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    document.getElementById("copyright").textContent =
  `©${new Date().getFullYear()} Rubia M. Francesco @ Madagascar`;

document.getElementById("last-modified").textContent =
  `Last Updated: ${document.lastModified}`;


// Main DOM manipulation
const container = document.getElementById('courseButtonsContainer');
const filterButtons = document.querySelectorAll('.filters button');
const totalCreditsEl = document.getElementById('total-credits');

// Render function
function renderCourses(filter) {
    container.innerHTML = ''; // Clear

    const filtered = filter === 'ALL' ? courses : courses.filter(course => course.subject === filter);

    filtered.forEach(course => {
        const btn = document.createElement('button');
        btn.textContent = `${course.subject} ${course.number}`;
        btn.classList.add(course.completed ? 'completed' : 'incomplete');
        container.appendChild(btn);
    });

     // Calculate and show total credits using reduce()
    const totalCredits = filtered.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsEl.textContent = `Total Credits: ${totalCredits}`;

}

// Filter button event listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        renderCourses(filter);
    });
});

// Initial render
renderCourses('ALL');
