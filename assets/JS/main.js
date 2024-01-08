import {
    generrateportfolio,
    generateFilterButton,
    filterButton,
} from "./f_portfolio.js";

import {
    displayLogout,
    displayEditBanner,
    displayModifs,
    hideFilterButtons,
} from "./f_loggedIn.js";

import { 
    displayPopUp,
    generateGridPopUp,
    removeProject,
} from "./f_modal_rm.js";

import {
    displayAddProjectPopUp,
    formListCategory,
    addImage,
    validateInputs,
    addProject,
} from "./f_modal_add.js";

const responseWorks = await fetch("http://localhost:5678/api/works");
const projects = await responseWorks.json();
const responseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await responseCategories.json();

let logs = window.localStorage.getItem("logs");
const divGallery = document.querySelector(".gallery");
const portfolio = document.querySelector("#portfolio");
const logIn = document.querySelector('nav a[href="./login.html"]');
const popupBackground = document.querySelector(".popupBackground");
const addProjectForm = document.getElementById("add_project");
const addForm = document.querySelector("#add_project form");
const inputAddImage = document.querySelector("[type=file]");
const DivPreviewImage = document.querySelector(".add_picture");


generrateportfolio(projects, divGallery);

if (logs != null) {
    displayLogout(logIn);
    displayEditBanner();
    displayModifs(portfolio);
    hideFilterButtons();
    displayPopUp(popupBackground);
    generateGridPopUp(projects);
    removeProject(projects,logs);
    displayAddProjectPopUp(popupBackground, addForm, DivPreviewImage);
    formListCategory(categories);
    addImage(inputAddImage, DivPreviewImage);
    validateInputs(addProjectForm);
    addProject(addProjectForm, logs, DivPreviewImage);
} else {
    generateFilterButton(categories);
    filterButton(categories);
};