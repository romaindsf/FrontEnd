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



export {
    displayPopUp,
    generateGridPopUp,
    removeProject,
}