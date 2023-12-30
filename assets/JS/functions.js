function generrateportfolio (projects, divGallery) {
    for (let i = 0; i< projects.length; i++) {
        const projetElement = document.createElement("figure");
        projetElement.dataset.category = projects[i].category.id;
        const imgElement = document.createElement("img");
        imgElement.src = projects[i].imageUrl;
        const titleElement = document.createElement("figcaption");
        titleElement.textContent = projects[i].title;
        divGallery.appendChild(projetElement);
        projetElement.appendChild(imgElement);
        projetElement.appendChild(titleElement);
    };
};

function filterButton (categories, btnCategories, btnAll) {
    const listProjet = document.querySelectorAll(".gallery figure");
    for(let i = 1; i < btnCategories.length; i++) {
        btnCategories[i].dataset.id = categories[i - 1].id;
        btnCategories[i].addEventListener("click", (event) => {
            listProjet.forEach(projet => {
                projet.style.display = "block";
                if(event.target.dataset.id != projet.dataset.category) {
                    projet.style.display = "none";
                };
            });
        });
    };
    btnAll.addEventListener("click", () =>{
        listProjet.forEach(projet => {
            projet.style.display = "block";
        });
    });
};

function displayLogout (logIn) {
    logIn.innerHTML = `<a href=#>logout</a>`;
    logIn.addEventListener("click", ()=> {
        window.localStorage.removeItem("logs");
        location.reload();
    });
};

function displayEditBanner () {
    const editionBanner = document.createElement("p");
    editionBanner.innerHTML += `<i class="fa-regular fa-pen-to-square"></i>Mode edition`;
    editionBanner.classList.add("edit_banner");
    document.body.prepend(editionBanner);   //à la place de .appendChild, place l'élément enfant en premier
};

function displayModifs (portfolio) {
    const linkModifs = document.createElement("a");
    linkModifs.innerHTML += `<i class="fa-regular fa-pen-to-square"></i>modifier`;
    linkModifs.href = "#";
    linkModifs.classList.add("btnOpenModal");
    portfolio.appendChild(linkModifs);
};

function hideFilterButtons (btnCategories) {
    btnCategories.forEach(button => {
        button.style.display = "none";
    });
};

function displayPopUp (popupBackground) {
    const btnOpenModal = document.querySelector(".btnOpenModal");
    const iconCloseModal = document.querySelector(".close_modal");
    btnOpenModal.addEventListener("click", () => {
        popupBackground.classList.add("active");
    });
    iconCloseModal.addEventListener("click", () => {
        popupBackground.classList.remove("active");
    });
    popupBackground.addEventListener("click", (event) => {
        if (event.target === popupBackground) {
            popupBackground.classList.remove("active")
        };
    });
};

function generateGridPopUp (projects) {
    const gridThumbnail = document.querySelector(".grid_thumbnail");
    for (let i = 0; i< projects.length; i++) {
        const gridElement = document.createElement("div");
        const imgElement = document.createElement("img");
        imgElement.src = projects[i].imageUrl;
        const trashCan = document.createElement("i");
        trashCan.classList.add("fa-solid", "fa-trash-can");
        gridThumbnail.appendChild(gridElement);
        gridElement.appendChild(imgElement);
        gridElement.appendChild(trashCan);
    };
};

function removeProject(projects, logs) {
    const listProjet = document.querySelectorAll(".gallery figure");
    const listThumbnail = document.querySelectorAll(".grid_thumbnail div");
    const allTrashIcons = document.querySelectorAll(".grid_thumbnail i");
    for (let i = 0; i< projects.length; i++) {
        listProjet[i].dataset.id = projects[i].id;
        listThumbnail[i].dataset.id = projects[i].id;
        allTrashIcons[i].dataset.id = projects[i].id;
        allTrashIcons[i].addEventListener("click", async (event) => {
            await fetch(`http://localhost:5678/api/works/${event.target.dataset.id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${logs}`,
                    "Content-Type": "application/json"
                },
            });
            listThumbnail.forEach(thumbnail => {
                if (event.target.dataset.id === thumbnail.dataset.id) {
                    thumbnail.remove();
                };
            });
            listProjet.forEach(projet => {
                if (event.target.dataset.id === projet.dataset.id) {
                    projet.remove();
                };
            });
        });
    };
};

function displayAddProjectPopUp (popupBackground) {
    const btnAddProject = document.querySelector(".popup button");
    const addProjectBackground = document.querySelector(".add_project_background");
    const closepopup = document.querySelector(".close_popup")
    const goBack = document.querySelector(".fa-arrow-left")
    btnAddProject.addEventListener("click", () => {
        popupBackground.classList.remove("active");
        addProjectBackground.classList.add("active");
    })
    closepopup.addEventListener("click", () => {
        addProjectBackground.classList.remove("active");
    });
    goBack.addEventListener("click", () => {
        addProjectBackground.classList.remove("active");
        popupBackground.classList.add("active");
    })
    addProjectBackground.addEventListener("click", (event) => {
        if (event.target === addProjectBackground) {
            addProjectBackground.classList.remove("active");
        };
    });
}

export {
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
};