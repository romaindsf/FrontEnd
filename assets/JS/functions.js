function genererTravaux (projects, divGallery) {
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

function displayModifs (mesProjets) {
    const linkModifs = document.createElement("a");
    linkModifs.innerHTML += `<i class="fa-regular fa-pen-to-square"></i>modifier`;
    linkModifs.href = "#";
    linkModifs.classList.add("btnOpenModal");
    mesProjets.appendChild(linkModifs);
};

function hideFilterButtons (btnCategories) {
    btnCategories.forEach(button => {
        button.style.display = "none";
    });
};

function displayPopUp () {
    const btnOpenModal = document.querySelector(".btnOpenModal");
    const popupBackground = document.querySelector(".popupBackground");
    const iconCloseModal = document.querySelector(".close_modal")
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
}

function generateGridPopUp (projects) {
    const gridThumbnail = document.querySelector(".grid_thumbnail")
    for (let i = 0; i< projects.length; i++) {
        const gridElement = document.createElement("div");
        const imgElement = document.createElement("img");
        imgElement.src = projects[i].imageUrl;
        const trashCan = document.createElement("i")
        trashCan.classList.add("fa-solid", "fa-trash-can");
        gridThumbnail.appendChild(gridElement);
        gridElement.appendChild(imgElement);
        gridElement.appendChild(trashCan);
    };
}

export {
    genererTravaux,
    filterButton,
    displayLogout,
    displayEditBanner,
    displayModifs,
    hideFilterButtons,
    displayPopUp,
    generateGridPopUp,
};