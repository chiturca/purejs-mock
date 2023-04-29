//I have some notes here: since I use React mainly,
//I forget some parts of pure JS so I know I have some rendering problems.
//If in the real work environment I can use React, everything would be easier.
//If not, just know that I need to develop my pure JS practice,
//but please let me know if I can use React, thanks in advance

const navLinks = [
  {
    name: "Getting Started",
    subLinks: [
      {
        name: "User Guides",
        content: "We're a new category with lots of useful information.",
        link: "#",
        img: "https://cdn-icons-png.flaticon.com/512/3073/3073439.png",
      },
      {
        name: "Developer",
        content: "We're a new category with lots of useful information.",
        link: "#",
        img: "https://cdn-icons-png.flaticon.com/512/4299/4299902.png",
      },
      {
        name: "Release Notes",
        content: "We're a new category with lots of useful information.",
        link: "#",
        img: "https://cdn-icons-png.flaticon.com/512/7663/7663239.png",
      },
    ],
  },
  {
    name: "Personalization",
    subLinks: [
      {
        name: "",
        content: "We're a new category with lots of useful information.",
        link: "#",
        img: "https://via.placeholder.com/50x50",
      },
    ],
  },
];

// Render top navigation
const navEl = document.querySelector("#nav");
const navItems = [
  {
    name: "Home",
    link: "#",
    icon: "https://cdn-icons-png.flaticon.com/512/271/271228.png",
  },
  { name: "Getting Started", link: "#" },
];
for (const item of navItems) {
  const aEl = document.createElement("a");
  aEl.textContent = item.name;
  if (item.link) {
    aEl.href = item.link;
  }
  if (item.icon) {
    const imgEl = document.createElement("img");
    imgEl.src = item.icon;
    imgEl.style.width = "10px";
    aEl.appendChild(imgEl);
  }
  navEl.appendChild(aEl);

  // Render navLinks[name] values under Getting Started
  if (item.name === "Getting Started") {
    const subNavEl = document.createElement("div");
    subNavEl.classList.add("sub-nav");

    navEl.appendChild(subNavEl);
  }
}

//
// Render side navigation
const sidenavEl = document.querySelector("#sub-nav-links");

function renderSubLinks(subLinks) {
  sidenavEl.innerHTML = "";
  subLinks.map((subLink) => {
    const liEl = document.createElement("li");
    const aEl = document.createElement("a");
    aEl.textContent = subLink.name;
    aEl.href = subLink.link;
    aEl.classList.add("sub-nav-link");
    liEl.appendChild(aEl);
    sidenavEl.appendChild(liEl);
  });
}

// Render main links in side nav
const mainNavEl = document.querySelector("#nav-links");
navLinks.forEach((navLink, index) => {
  const liEl = document.createElement("li");
  const aEl = document.createElement("a");
  const defaultIcon = document.createElement("img");
  defaultIcon.src = "https://cdn-icons-png.flaticon.com/512/254/254434.png";
  defaultIcon.alt = "default icon";
  defaultIcon.style.width = "10px";
  defaultIcon.style.height = "10px";
  // defaultIcon.style.paddingRight = "5px";
  defaultIcon.classList.add("icon");

  const activeIcon = document.createElement("img");
  activeIcon.src = "https://cdn-icons-png.flaticon.com/512/9930/9930696.png";
  activeIcon.alt = "active icon";
  activeIcon.style.width = "10px";
  activeIcon.style.height = "10px";
  // activeIcon.style.paddingTop = "5px";
  activeIcon.classList.add("icon");

  aEl.textContent = navLink.name;
  aEl.href = "#";
  aEl.classList.add("nav-link");
  liEl.style.display = "flex";
  liEl.style.alignItems = "center";
  liEl.appendChild(aEl);
  liEl.appendChild(defaultIcon);
  mainNavEl.appendChild(liEl);

  aEl.addEventListener("click", (event) => {
    event.preventDefault();
    const isActive = aEl.classList.contains("active");
    const activeLink = mainNavEl.querySelector(".nav-link.active");

    if (isActive) {
      sidenavEl.innerHTML = "";
      aEl.classList.remove("active");
      liEl.removeChild(activeIcon);
      liEl.appendChild(defaultIcon);
    } else {
      if (activeLink) {
        activeLink.classList.remove("active");
        const activeLiEl = activeLink.parentNode;
        activeLiEl.removeChild(activeIcon);
        activeLiEl.appendChild(defaultIcon);
      }
      renderSubLinks(navLink.subLinks);
      aEl.classList.add("active");
      liEl.removeChild(defaultIcon);
      liEl.appendChild(activeIcon);
    }
  });
});

// MAIN PART

const cardsEl = document.getElementById("cards");

function renderCards(subLinks) {
  cardsEl.innerHTML = "";
  subLinks.forEach((subLink) => {
    const cardEl = document.createElement("div");
    const imgEl = document.createElement("img");
    const contentEl = document.createElement("div");

    cardEl.classList.add("card");
    imgEl.classList.add("card-img");
    contentEl.classList.add("card-content");

    imgEl.src = subLink.img;
    contentEl.innerHTML = `
      <h3>${subLink.name}</h3>
      <p>${subLink.content}</p>
    `;
    cardEl.appendChild(imgEl);
    cardEl.appendChild(contentEl);
    cardsEl.appendChild(cardEl);
  });
}

renderCards(navLinks[0].subLinks);
