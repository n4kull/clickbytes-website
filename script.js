document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const html = document.documentElement; // Get the root <html> element

    // Check if the user's system prefers dark mode
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Retrieve saved theme from localStorage, or use system preference
    let savedTheme = localStorage.getItem("theme") || (systemPrefersDark ? "https://github.com/n4kull/clickbytes-website/blob/main/images/sun96.png" : "https://github.com/n4kull/clickbytes-website/blob/main/images/moon96.png");

    // Apply the selected theme
    html.setAttribute("data-theme", savedTheme);
    themeIcon.src = savedTheme === "dark" ? "https://github.com/n4kull/clickbytes-website/blob/main/images/sun96.png" : "https://github.com/n4kull/clickbytes-website/blob/main/images/moon96.png";

    // Create an overlay div for smooth transition
    const overlay = document.createElement("div");
    overlay.classList.add("theme-overlay");
    document.body.appendChild(overlay);

    themeToggle.addEventListener("click", () => {
        // Step 1: Capture current background color before switching theme
        overlay.style.background = getComputedStyle(html).getPropertyValue("--background");
        overlay.style.opacity = "1"; // Step 2: Fade in overlay

        setTimeout(() => {
            // Step 3: Toggle theme
            let newTheme = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
            html.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);

            // Step 4: Update theme icon
            themeIcon.src = newTheme === "dark" ? "https://github.com/n4kull/clickbytes-website/blob/main/images/sun96.png" : "https://github.com/n4kull/clickbytes-website/blob/main/images/moon96.png";

            // Step 5: Fade out overlay after theme switch
            setTimeout(() => {
                overlay.style.opacity = "0";
            }, 200);
        }, 100); // Wait 100ms before switching theme for a smooth effect
    });
});
