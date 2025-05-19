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



//   const courseListDiv = document.getElementById('course-list');
// const creditDisplay = document.getElementById('total-credits');

// function renderCourses(filterType = 'all') {
//   let filtered = courses;
//   if (filterType !== 'all') {
//     filtered = courses.filter(course => course.type === filterType);
//   }

//   courseListDiv.innerHTML = '';
//   let totalCredits = 0;

//   filtered.forEach(course => {
//     const card = document.createElement('div');
//     card.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;
//     card.innerHTML = `
//     <p>${course.subject}</p>
//       <h4>${course.number}</h4>
//       `;
//       courseListDiv.appendChild(card);
//       totalCredits += course.credits;
//     });
    
//     creditDisplay.textContent = `Total Credits: ${totalCredits}`;
// }

// // Filter Button Event
// document.querySelectorAll('.filters button').forEach(button => {
//   button.addEventListener('click', () => {
//     renderCourses(button.dataset.filter);
//   });
// });

// renderCourses(); // Initial load

//<p>Credits: ${course.credits}</p>



// Main DOM manipulation
const container = document.getElementById('courseButtonsContainer');
const filterButtons = document.querySelectorAll('.filters button');

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
