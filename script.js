// script.js - Main Component Loader
function loadComponent(selector, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .then(() => {
            if (file.includes("navbar.html")) {
                loadNavbar(); // Call navbar functions after loading
            }
            if (file.includes("dock.html")) {
                loadDock(); // Call dock functions after loading
            }
        })
        .catch(error => console.error(`Error loading ${file}:`, error));
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("#navbar-container", "components/navbar.html");
    loadComponent("#dock-container", "components/dock.html");
});

// js/navbar.js - Navbar Functions
function loadNavbar() {
    console.log("Navbar loaded");
    // Future navbar interactions can be added here
}

// js/dock.js - Dock Functions
function loadDock() {
    console.log("Dock loaded");
    // Future dock interactions can be added here
}
