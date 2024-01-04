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
    addImage,
    addProject,
} from "./f_portfolio.js"; "./f_loggedIn.js"; "./f_modal_rm.js"; "./f_modal_add.js";


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
const addProjectForm = document.getElementById("add_project");
const inputAddImage = document.querySelector("[type=file]");
const DivPreviewImage = document.querySelector(".add_picture");


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
    addImage(inputAddImage, DivPreviewImage);
    addProject(addProjectForm, logs, projects);
} else {
    filterButton(categories, btnCategories, btnAll);
};