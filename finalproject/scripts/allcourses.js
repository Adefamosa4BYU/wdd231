const url = "data/allcourses.json";
let jsonData = {};
let slideInterval2;

async function loadData() {
  try {
    const response = await fetch(url);
    jsonData = await response.json();
    renderCategories();
    renderCourses("All");
    startAutoSlide();
  } catch (error) {
    console.error("Failed to load data:", error);
  }
}

function renderCategories() {
  const categoryTrack = document.getElementById("categoryTrack");
  categoryTrack.innerHTML = "";

  const counts = {};
  jsonData.courses.forEach(course => {
    counts[course.category] = (counts[course.category] || 0) + 1;
  });

  const allCategories = ["All", ...Object.keys(counts)];

  allCategories.forEach((cat, idx) => {
    const btn = document.createElement("button");
    btn.className = "category-btn" + (idx === 0 ? " active" : "");
    const count = cat === "All"
      ? jsonData.courses.length
      : counts[cat];
    btn.innerHTML = `${cat} <span class="badge">${count}</span>`;
    btn.onclick = () => {
      document.querySelectorAll(".category-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderCourses(cat);
    };
    categoryTrack.appendChild(btn);
  });
}

function renderCourses(selectedCategory) {
  const carouselTrack = document.getElementById("carouselTrack");
  carouselTrack.innerHTML = "";

  const filtered = selectedCategory === "All"
    ? jsonData.courses
    : jsonData.courses.filter(c => c.category === selectedCategory);

  filtered.forEach(course => {
    const div = document.createElement("div");
    div.className = "course-card";
    div.innerHTML = `
      <img src="${course.image}" alt="${course.title}" />
      <div class="course-content">
        <h3>${course.title}</h3>
        <p>${course.description}</p>
        <a href="#" class="view-btn">View</a>
      </div>`;
    carouselTrack.appendChild(div);
  });
}

function scrollCategory(dir) {
  document.getElementById("categoryTrack").scrollBy({ left: dir * 200, behavior: 'smooth' });
}

function scrollCarousel(dir) {
  document.getElementById("carouselTrack").scrollBy({ left: dir * 300, behavior: 'smooth' });
}

function startAutoSlide() {
  slideInterval2 = setInterval(() => scrollCarousel(1), 5000);
}

function pauseAutoSlide() {
  clearInterval(slideInterval2);
}

loadData();
