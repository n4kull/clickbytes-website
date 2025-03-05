document.addEventListener("DOMContentLoaded", () => {
    function initThemeToggle() {
        const themeToggle = document.getElementById("theme-toggle");
        const themeIcon = document.getElementById("theme-icon");
        const html = document.documentElement; 

        if (!themeToggle || !themeIcon) {
            console.warn("Theme toggle or icon not found. Retrying...");
            setTimeout(initThemeToggle, 100);
            return;
        }

        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        let savedTheme = localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");

        html.setAttribute("data-theme", savedTheme);
        updateThemeIcon(savedTheme);

        // Create and style the overlay
        const overlay = document.createElement("div");
        overlay.classList.add("theme-overlay");
        document.body.appendChild(overlay);

        themeToggle.addEventListener("click", () => {
            // Capture the current background color
            overlay.style.background = getComputedStyle(html).getPropertyValue("--background");
            overlay.classList.add("show"); // Fade in overlay

            setTimeout(() => {
                let newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
                html.setAttribute("data-theme", newTheme);
                localStorage.setItem("theme", newTheme);
                updateThemeIcon(newTheme);
            }, 1200); // Delay theme switch to match animation

            setTimeout(() => {
                overlay.classList.remove("show"); // Fade out overlay
            }, 2000); // Slight delay before hiding overlay
        });

        function updateThemeIcon(theme) {
            themeIcon.src = theme === "dark" 
                ? "/assets/icons/sun.png" 
                : "/assets/icons/moon.png";
        }
    }

    initThemeToggle();
});
