document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const hourHand = document.querySelector(".hour");
    const minuteHand = document.querySelector(".minute");
    const secondHand = document.querySelector(".second");
    const modeSwitch = document.querySelector(".mode-switch");

    const digitalTimeEl = document.querySelector("#digital-time");
    const digitalDateEl = document.querySelector("#digital-date");
    const themeButtons = document.querySelectorAll(".theme-btn");

    // Theme (saved)
    const setTheme = (theme) => {
        body.dataset.theme = theme;
        localStorage.setItem("theme", theme);

        themeButtons.forEach((btn) => {
            btn.classList.toggle(
                "is-active",
                btn.dataset.theme === theme
            );
        });
    };

    setTheme(localStorage.getItem("theme") || "ocean");

    themeButtons.forEach((btn) => {
        btn.addEventListener("click", () =>
            setTheme(btn.dataset.theme)
        );
    });

    // Dark mode (saved)
    if (localStorage.getItem("mode") === "Dark Mode") {
        body.classList.add("dark");
        modeSwitch.textContent = "Light Mode";
    }

    const toggleDarkMode = () => {
        const isDarkMode = body.classList.toggle("dark");
        modeSwitch.textContent = isDarkMode
            ? "Light Mode"
            : "Dark Mode";

        localStorage.setItem(
            "mode",
            isDarkMode ? "Dark Mode" : "Light Mode"
        );
    };

    modeSwitch.addEventListener("click", toggleDarkMode);

    // Keyboard support
    modeSwitch.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDarkMode();
        }
    });

    // Analog hands + digital readout
    const updateTime = () => {
        const date = new Date();
        const seconds = date.getSeconds();
        const minutes = date.getMinutes();
        const hours = date.getHours() % 12;

        const secToDeg = (seconds / 60) * 360;
        const minToDeg = ((minutes + seconds / 60) / 60) * 360;
        const hrToDeg = ((hours + minutes / 60) / 12) * 360;

        secondHand.style.transform = `rotate(${secToDeg}deg)`;
        minuteHand.style.transform = `rotate(${minToDeg}deg)`;
        hourHand.style.transform = `rotate(${hrToDeg}deg)`;

        if (digitalTimeEl) {
            digitalTimeEl.textContent = new Intl.DateTimeFormat(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }).format(date);
        }

        if (digitalDateEl) {
            digitalDateEl.textContent = new Intl.DateTimeFormat(undefined, {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "2-digit",
            }).format(date);
        }
    };

    // Start
    updateTime();
    setInterval(updateTime, 1000);

});