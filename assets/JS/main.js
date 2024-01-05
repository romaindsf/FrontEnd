import {
    generrateportfolio,
    filterButton,
    
} from "./f_portfolio.js";

import {
    displayLogout,
    displayEditBanner,
    displayModifs,
    hideFilterButtons
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
    addProject,
} from "./f_modal_add.js";

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
    formListCategory(categories);
    addImage(inputAddImage, DivPreviewImage);
    addProject(addProjectForm, logs, projects);
} else {
    filterButton(categories, btnCategories, btnAll);
};




/*
ajouter listenner change dans le form add
si tous les champs sont valides alors le boutons passent aux vert

ecouter la réponse de la requête et ensuite l'ajouter au DOM

>reindent lines
pour indenter

mode edition polices a modifier


gere verifier les champs lors de l'ajout d'un nouveau projet que le bouton ne soit pas vert DESACTIV2
AJOUT POID MAINAL CONTRINTE SUR L4INPUT TYPE FILES
message générique si erreur dans form add project
"les information ne sont pas celle
la liste catégoties dynamique

verifier le code a la fin
console log et w3c
*/