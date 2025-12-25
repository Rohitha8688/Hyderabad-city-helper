const places = [
  { name: "Sri Sai Boys Hostel", area: "Amirpet", type: "Hostel", price: 6500 },
  { name: "Lakshmi Girls Hostel", area: "Amirpet", type: "Hostel", price: 7000 },
  { name: "Comfort Stay Hostel", area: "Amirpet", type: "Hostel", price: 5500 },
  { name: "Vector IT Institute", area: "Amirpet", type: "Institute", price: 12000 },
  { name: "Food Point", area: "Amirpet", type: "Restaurant", price: 300 },
  { name: "Sai Stationery", area: "Amirpet", type: "Stationery", price: 0 },
  { name: "Ameer Mall", area: "Amirpet", type: "Mall", price: 0 },

  { name: "Elite Boys Hostel", area: "Madhapur", type: "Hostel", price: 8000 },
  { name: "Budget Living Hostel", area: "Madhapur", type: "Hostel", price: 5000 },
  { name: "TechZone Institute", area: "Madhapur", type: "Institute", price: 15000 },
  { name: "Spice Hub", area: "Madhapur", type: "Restaurant", price: 400 },
  { name: "Central Mall", area: "Madhapur", type: "Mall", price: 0 },
  { name: "Office Needs Stationery", area: "Madhapur", type: "Stationery", price: 0 },

  { name: "JNTU Boys Hostel", area: "JNTU", type: "Hostel", price: 6000 },
  { name: "Campus IT Institute", area: "JNTU", type: "Institute", price: 10000 },

  { name: "KPHB Comfort Hostel", area: "KPHB", type: "Hostel", price: 7500 },
  { name: "SkillUp Institute", area: "KPHB", type: "Institute", price: 11000 },
  { name: "Daily Needs Stationery", area: "KPHB", type: "Stationery", price: 0 }
];

const categorySelect = document.getElementById("category");
const budgetInput = document.getElementById("budget");

categorySelect.addEventListener("change", function () {
  if (this.value === "Stationery" || this.value === "Mall") {
    budgetInput.value = "";
    budgetInput.disabled = true;
  } else {
    budgetInput.disabled = false;
  }
});

document.getElementById("searchBtn").addEventListener("click", function () {
  const area = document.getElementById("area").value;
  const category = categorySelect.value;
  const budgetValue = Number(budgetInput.value);
  const resultsDiv = document.getElementById("results");

  resultsDiv.innerHTML = "";

  let minBudget = 0;
  let maxBudget = Infinity;

  if (
    budgetValue > 0 &&
    category !== "Stationery" &&
    category !== "Mall"
  ) {
    minBudget = budgetValue - 2000;
    maxBudget = budgetValue + 2000;
  }

  const filtered = places.filter(place => {
    const areaMatch = area === "" || place.area === area;
    const typeMatch = category === "" || place.type === category;
    const budgetMatch =
      category === "Stationery" ||
      category === "Mall" ||
      (place.price >= minBudget && place.price <= maxBudget);

    return areaMatch && typeMatch && budgetMatch;
  });

  if (filtered.length === 0) {
    resultsDiv.innerHTML = "<p>No results found</p>";
    return;
  }

  filtered.forEach(place => {
    const mapLink = `https://www.google.com/maps/search/?api=1&query=${place.name} ${place.area}`;

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <h3>${place.name}</h3>
      <p>Area: ${place.area}</p>
      <p>Type: ${place.type}</p>
      ${place.price > 0 ? `<p>Budget: ${place.price}</p>` : ""}
      <a href="${mapLink}" target="_blank">View on Map</a>
    `;
    resultsDiv.appendChild(div);
  });
});
