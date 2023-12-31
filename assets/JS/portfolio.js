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

const addProjectForm = document.getElementById("add_project");
addProjectForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const newProject = {
        image: event.target.querySelector("[name=image]").value,
        title: event.target.querySelector("[name=title]").value,
        category: event.target.querySelector("[name=category]").value,
    };
    const POSTrequest = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: JSON.stringify(newProject),
        headers: {
            "Authorization": `Bearer ${logs}`,
            "Content-Type": "application/json"
        },
    });
    if (POSTrequest.status === 200) {console.log("Success!");}
    else {console.log("Erreur")};
})