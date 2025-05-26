const apiKey = '972388f52edf9daa3699bcef9bfee4d3';
const lat = 7.3775355; // Example: Lagos, Nigeria
const lon = 3.9470396;

// URLs
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {
    // --- Get current weather data ---
    const currentResponse = await fetch(currentUrl);
    const currentData = await currentResponse.json();

    const temp = Math.round(currentData.main.temp);
    const description = currentData.weather[0].description;
    const high = Math.round(currentData.main.temp_max);
    const low = Math.round(currentData.main.temp_min);
    const humidity = currentData.main.humidity;
    const icon = currentData.weather[0].icon;
    const sunrise = new Date(currentData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const sunset = new Date(currentData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById('current-weather').innerHTML = `
  <img id="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
  <div class="weather-details">
    <p><strong>${temp}°F</strong></p>
    <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
    <p>High: ${high}°</p>
    <p>Low: ${low}°</p>
    <p>Humidity: ${humidity}%</p>
    <p>Sunrise: ${sunrise}</p>
    <p>Sunset: ${sunset}</p>
  </div>
`;

    // --- Get 3-day forecast data ---
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    const forecastEl = document.getElementById('forecast');
    const forecastDays = {};
    forecastData.list.forEach(entry => {
        const date = new Date(entry.dt_txt);
        const day = date.toLocaleDateString('en-US', { weekday: 'long' });
        const hour = date.getHours();

        if (!forecastDays[day] && hour === 12) {
            forecastDays[day] = Math.round(entry.main.temp);
        }
    });

    let count = 0;
    for (let [day, temp] of Object.entries(forecastDays)) {
        forecastEl.innerHTML += `<p><strong>${day}:</strong> ${temp}°F</p>`;
        if (++count >= 3) break;
    }
}

getWeather();



const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
});



async function loadSpotlights() {
    const response = await fetch('data/member.json'); // Adjust path as needed
    const data = await response.json();

    // Filter gold or silver
    const premium = data.filter(member =>
        member.membership === 'gold' || member.membership === 'silver'
        // member.membership === 'gold' || member.membership === 'silver' || member.membership === 'basic'
    );

    // Randomly select 2 or 3 members
    const shuffled = premium.sort(() => 0.5 - Math.random());
    // const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 3);
    const selected = shuffled.slice(0, 3);

    const container = document.querySelector('.spotlight-container');
    selected.forEach(member => {
    
    container.innerHTML += `
  <div class="spotlight-card">
    <h3>${member.name}</h3>
    <p class="tagline">${member.tagline || ''}</p>
    <div class="spotlight-content">
      <img src="${member.logo}" alt="${member.name} logo">
      <div class="spotlight-info">
        <p><strong>Email:</strong> ${member.email}</p>
        <p><strong>Phone:</strong> ${member.phone}</p>
        <p><strong>Address:</strong> ${member.address}</p>
        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
        <p class="membership"><strong>Membership:</strong> ${member.membership}</p>
      </div>
    </div>
  </div>
`;
    });
}

loadSpotlights();
