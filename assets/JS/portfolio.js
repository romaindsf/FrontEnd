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
const inputAddImage = document.querySelector("[type=file]");
const DivPreviewImage = document.querySelector(".add_picture");
inputAddImage.addEventListener("change", (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        const divAddPictureContent = document.querySelectorAll(".add_picture *");
        divAddPictureContent.forEach(element => {
            element.style.display = "none";
        });
        const previewImage = document.createElement("img");
        previewImage.src = event.target.result;
        DivPreviewImage.appendChild(previewImage);
        DivPreviewImage.style.padding = 0;
    };
    reader.readAsDataURL(image);
});

addProjectForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const newProject = new FormData();
        newProject.append("image", event.target.querySelector("[name=image]").files[0]);
        newProject.append("title", event.target.querySelector("[name=title]").value);
        newProject.append("category", event.target.querySelector("[name=category]").value);
    const POSTrequest = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: newProject,
        headers: {"Authorization": `Bearer ${logs}`},
    });
    console.log(newProject);
    if (POSTrequest.status === 200) {console.log("Success!");}
    else {console.log("Erreur")};
})
