let yourName = prompt("What is your name?");

// Jika input kosong atau hanya spasi, set jadi "there" atau nama default
if (yourName === null || yourName.trim() === "") {
  yourName = "there";
}

// Setelah mendapatkan nama yang valid
const welcomeEl = document.getElementById("welcome-message");
if (welcomeEl) {
  welcomeEl.innerText = `Hi ${yourName}, Welcome to my website`;
}

const portfolioData = [
  {
    title: "Project 1",
    description: "Description for project 1.",
    image: "assets/project1.jpg",
    link: "#",
  },
  {
    title: "Project 2",
    description: "Description for project 2.",
    image: "assets/project2.jpg",
    link: "#",
  },
  {
    title: "Project 3",
    description: "Description for project 3.",
    image: "assets/project3.jpg",
    link: "#",
  },
];

// Element container untuk cards
const portfolioContainer = document.getElementById("portfolio-cards-container");

// Generate cards
portfolioData.forEach((project) => {
  const card = document.createElement("div");
  card.className = "portfolio-card";

  card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="card-image">
            <h3 class="card-title">${project.title}</h3>
            <p class="card-description">${project.description}</p>
            <a href="${project.link}" class="card-link" target="_blank">View Project</a>
        `;

  portfolioContainer.appendChild(card);
});

// Submit Form
document
  .getElementById("contact-form")
  .addEventListener("submit", handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const message = document.getElementById("message").value;
  const timeNow = new Date().toString();

  document.getElementById("result-name").innerText = name;
  document.getElementById("result-dob").innerText = dob;
  document.getElementById("result-gender").innerText = gender;
  document.getElementById("result-message").innerText = message;
  document.getElementById("current-time").innerText = timeNow;
}

// Toggle Menu untuk responsive design
function toggleMenu() {
  const nav = document.getElementById("main-nav");
  const body = document.body;

  nav.classList.toggle("active");
  body.classList.toggle("nav-open");
}

// Banner Autoslide
let indexBanner = 0;

function nextBanner() {
  indexBanner += 1;
  showBanner();
}

function showBanner() {
  const bannerList = document.getElementsByClassName('banner-img');

  if (indexBanner >= bannerList.length) {
    indexBanner = 0;
  }

  for (let i = 0; i < bannerList.length; i++) {
    bannerList[i].classList.remove('active');
  }

  bannerList[indexBanner].classList.add('active');
}

showBanner();
setInterval(nextBanner, 3000);