// Set timestamp on page load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#timestamp").value = new Date().toISOString();

  // Modal Logic
  const links = document.querySelectorAll(".info-link");
  const modals = document.querySelectorAll(".modal");
  const closeButtons = document.querySelectorAll(".close");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const modalId = e.target.dataset.modal;
      document.getElementById(modalId).style.display = "block";
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      modals.forEach(m => (m.style.display = "none"));
    });
  });

  window.addEventListener("click", e => {
    modals.forEach(m => {
      if (e.target === m) m.style.display = "none";
    });
  });
});
