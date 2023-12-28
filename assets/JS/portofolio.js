import {
    genererTravaux,
    filterButton,
    displayLogout,
    displayEditBanner,
    displayModifs,
    hideFilterButtons,
    displayPopUp,
    generateGridPopUp,
} from "./functions.js";


const responseWorks = await fetch("http://localhost:5678/api/works");
const projects = await responseWorks.json();
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

let logs = window.localStorage.getItem("logs");
const divGallery = document.querySelector(".gallery");
const mesProjets = document.querySelector("#portfolio");
const btnCategories = document.querySelectorAll(".btn");
const btnAll = document.querySelector(".filtres .btn:first-child");
const logIn = document.querySelector('nav a[href="./login.html"]');

genererTravaux(projects, divGallery);
filterButton(categories, btnCategories, btnAll);

if (logs != null) {
    displayLogout(logIn);
    displayEditBanner();
    displayModifs(mesProjets);
    hideFilterButtons(btnCategories);
    displayPopUp();
    generateGridPopUp(projects);
}
