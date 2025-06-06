const messageBox = document.getElementById("visitor-msg");
const lastVisit = localStorage.getItem("lastVisit");
const currentTime = Date.now();

if (!lastVisit) {
  messageBox.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const daysDifference = Math.floor((currentTime - lastVisit) / (1000 * 60 * 60 * 24));
  if (daysDifference < 1) {
    messageBox.textContent = "Back so soon! Awesome!";
  } else {
    const dayText = daysDifference === 1 ? "day" : "days";
    messageBox.textContent = `You last visited ${daysDifference} ${dayText} ago.`;
  }
}
localStorage.setItem("lastVisit", currentTime);
