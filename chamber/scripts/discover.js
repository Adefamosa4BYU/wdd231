const grid = document.getElementById("discoverGrid");

fetch("data/discover.json")
  .then((res) => res.json())
  .then((items) => {
    items.forEach((item, index) => {
      const card = document.createElement("article");
      card.classList.add("discover-card");
      card.style.gridArea = `card${index + 1}`;

      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}" loading="lazy" width="300" height="200" />
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn more</button>
      `;

      grid.appendChild(card);
    });
  });
