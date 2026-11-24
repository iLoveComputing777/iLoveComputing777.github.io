const darkModeStorageKey = "animalLookDarkMode";
const darkModeToggle = document.getElementById("dark-mode-toggle");

document.body.classList.toggle(
  "dark-mode",
  localStorage.getItem(darkModeStorageKey) === "true"
);

if (darkModeToggle) {
  const updateToggle = () => {
    const isDarkMode = document.body.classList.contains("dark-mode");
    darkModeToggle.setAttribute("aria-pressed", String(isDarkMode));
    darkModeToggle.textContent = isDarkMode ? "Turn off" : "Turn on";
  };

  updateToggle();
  darkModeToggle.addEventListener("click", () => {
    const isDarkMode = !document.body.classList.contains("dark-mode");
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem(darkModeStorageKey, String(isDarkMode));
    updateToggle();
  });
}
