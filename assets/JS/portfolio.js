import {
    generrateportfolio,
    filterButton,
    displayLogout,
    displayEditBanner,
    displayModifs,
    hideFilterButtons,
    displayPopUp,
    generateGridPopUp,
    removeProject,
    displayAddProjectPopUp,
} from "./functions.js";


const responseWorks = await fetch("http://localhost:5678/api/works");
const projects = await responseWorks.json();
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

let logs = window.localStorage.getItem("logs");
const divGallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const btnCategories = document.querySelectorAll(".btn");
const btnAll = document.querySelector(".filtres .btn:first-child");
const logIn = document.querySelector('nav a[href="./login.html"]');
const popupBackground = document.querySelector(".popupBackground");

generrateportfolio(projects, divGallery);

if (logs != null) {
    displayLogout(logIn);
    displayEditBanner();
    displayModifs(portfolio);
    hideFilterButtons(btnCategories);
    displayPopUp(popupBackground);
    generateGridPopUp(projects);
    removeProject(projects,logs);
    displayAddProjectPopUp(popupBackground);
} else {
    filterButton(categories, btnCategories, btnAll);
};

/*
function displayPopUp () {
    const btnOpenModal = document.querySelector(".btnOpenModal");
    const popupBackground = document.querySelector(".popupBackground");
    const iconCloseModal = document.querySelector(".close_modal");
    btnOpenModal.addEventListener("click", () => {
        popupBackground.style.display = "block";
    });
    iconCloseModal.addEventListener("click", () => {
        popupBackground.style.display = "none";
    });
    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            popupBackground.style.display = "none";
        };
    });
};
*/