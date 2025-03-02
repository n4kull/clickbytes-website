document.addEventListener("DOMContentLoaded", () => {
    const toggleInput = document.getElementById("theme-toggle"); // Get the theme toggle switch
    const html = document.documentElement; // Get the root <html> element

    // Ensure the toggle button exists to prevent errors
    if (!toggleInput) {
        console.error("Theme toggle input not found!");
        return;
    }

    // Check if the user's system prefers dark mode
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Retrieve saved theme from localStorage, or use system preference
    let savedTheme = localStorage.getItem("theme") || (systemPrefersDark ? "dark" : "light");

    // Apply the selected theme
    html.setAttribute("data-theme", savedTheme);
    toggleInput.checked = savedTheme === "dark"; // Sync toggle with theme

    // Create an overlay div for smooth transition
    const overlay = document.createElement("div");
    overlay.classList.add("theme-overlay");
    document.body.appendChild(overlay);

    toggleInput.addEventListener("change", () => {
        // Step 1: Capture current background color before switching theme
        overlay.style.background = getComputedStyle(html).getPropertyValue("--background"); 
        overlay.style.opacity = "1"; // Step 2: Fade in overlay

        // Step 3: Change theme after fade-in is complete
        setTimeout(() => {
            const newTheme = toggleInput.checked ? "dark" : "light";
            html.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);

        // Step 4: Fade out overlay after a short delay
        setTimeout(() => {
            overlay.style.opacity = "0";
        }, 100); 
        }, 500); // Wait 500ms for fade-in effect before switching theme
    });


});
