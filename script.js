// On page load, set the default theme (light)
window.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme in localStorage (if any)
    const savedTheme = localStorage.getItem('theme') || 'theme-light'; // Default to light theme
    document.body.classList.add(savedTheme); // Apply saved theme immediately

    // Debugging: Check if the themeToggle button exists
    const themeToggle = document.getElementById('themeToggle');
    console.log('Theme Toggle button:', themeToggle);

    if (themeToggle) {
        // Add click event listener for the theme toggle button
        themeToggle.addEventListener('click', () => {
            console.log('Button clicked!');  // Check if the button was clicked

            // Toggle between dark and light themes
            if (document.body.classList.contains('theme-dark')) {
                document.body.classList.remove('theme-dark');
                document.body.classList.add('theme-light');
                localStorage.setItem('theme', 'theme-light'); // Save preference to localStorage
            } else {
                document.body.classList.remove('theme-light');
                document.body.classList.add('theme-dark');
                localStorage.setItem('theme', 'theme-dark'); // Save preference to localStorage
            }
        });
    } else {
        console.log('Theme toggle button not found');
    }
});




// Sélection de l'élément avec l'id "today"
const todayElement = document.getElementById("today");

// Récupération de la date actuelle
const currentDate = new Date();

// Formatage de la date
const options = { weekday: 'long', day: 'numeric', month: 'long' };
const formattedDate = currentDate.toLocaleDateString('en-GB', options);

// Insertion de la date formatée dans l'élément
if (todayElement) {
  todayElement.textContent = "(" + formattedDate + ")";
}

function translateTasksTitle() {
    // Sélection de l'élément avec l'ID "sectionTitle" dans le conteneur Tasks
    let sectionTitle = document.getElementById("sectionTitle");

    // Vérification si l'élément existe
    if (sectionTitle) {
        // Obtient la hauteur de l'élément
        const height = sectionTitle.offsetHeight;

        // Applique la hauteur comme une variable CSS
        sectionTitle.style.setProperty("--translate-y", `${height}px`);
    }
}

// Appel de la fonction translateTasksTitle
translateTasksTitle();

// Sélection de tous les éléments de navigation
const navBtns = document.querySelectorAll("nav .nav-link");

// Sélection du bouton d'action
let action = document.getElementById("action");
// Sélection du texte de l'action
let actionText = document.getElementById("actionText");
// Sélection de l'attribut data-bs-target de l'élément action
let actionTarget = action.getAttribute("data-bs-target");

// Ajout d'un écouteur d'événements pour chaque élément de navigation
for (let btn of navBtns) {
    btn.addEventListener("click", function(e) {

        // Empêche le comportement par défaut du lien de navigation
        e.preventDefault();

        // Suppression de la classe active de tous les éléments de navigation
        navBtns.forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const contentContainers = document.querySelectorAll(".js-container");

        contentContainers.forEach(container => {
            if (container.id === this.textContent.toLowerCase()) {
                container.classList.remove("d-none");

                actionText.textContent = "Add " + this.textContent;
                action.setAttribute("data-bs-target", "#add" + this.textContent + "Modal");
            } else {
                container.classList.add("d-none");
            }

            translateTasksTitle();
            
        });

    });
}

