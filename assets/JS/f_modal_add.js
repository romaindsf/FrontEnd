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
};

function formListCategory (categories) {
    const selectCategory = document.getElementById("category");
    const hiddenOption = document.createElement("option");
    hiddenOption.setAttribute("value", "");
    hiddenOption.setAttribute("hidden", "hidden");
    selectCategory.appendChild(hiddenOption)
    for (let i = 0; i < categories.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", [i + 1]);
        option.textContent = categories[i].name;
        selectCategory.appendChild(option);
    };
};

function addImage (inputAddImage, DivPreviewImage) {
    inputAddImage.addEventListener("change", (event) => {
        const image = event.target.files[0];
        if (image.size > 4194304) {
            const imgTooBig = document.querySelector(".add_picture p")
            imgTooBig.textContent = "La taille de l'image est trop élevée.";
            imgTooBig.style.color = "red";
            imgTooBig.style.textDecoration = "underline";
        } else {
            const reader = new FileReader();
            reader.onload = (event) => {
                const divAddPictureContent = document.querySelectorAll(".add_picture *");
                divAddPictureContent.forEach(element => {
                    element.style.display = "none";
                });
                const previewImage = document.createElement("img");
                previewImage.src = event.target.result;
                DivPreviewImage.style.paddingTop = "0";
                DivPreviewImage.style.paddingBottom = "0";
                DivPreviewImage.style.height = "210px";
                DivPreviewImage.appendChild(previewImage);
            };
            reader.readAsDataURL(image);
        };
    });
};

function validateInputs (addProjectForm) {
    const inputImage = document.getElementById("image");
    const inputTitle = document.getElementById("title");
    const selectCategory = document.getElementById("category");
    const btnSubmit = document.querySelector("#add_project [type=submit]");
    btnSubmit.setAttribute("disabled", "")
    addProjectForm.addEventListener("change", () => {
        if (inputImage.files.length > 0 && inputTitle.value != "" && selectCategory.value != "") {
            btnSubmit.removeAttribute("disabled");
            btnSubmit.style.backgroundColor = "#1D6154";
            btnSubmit.style.cursor = "pointer";
        };
    });
};

async function addProject (addProjectForm, logs, DivPreviewImage) {
    addProjectForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const errorMessage = document.querySelector(".error_info");
        const newProject = new FormData();
        newProject.append("image", event.target.querySelector("[name=image]").files[0]);
        newProject.append("title", event.target.querySelector("[name=title]").value);
        newProject.append("category", event.target.querySelector("[name=category]").value);
        const POSTrequest = await fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: newProject,
        headers: {"Authorization": `Bearer ${logs}`},
        });
            if (POSTrequest.status === 201) {
            errorMessage.textContent = "";
            const infoNewProject = await POSTrequest.json();
            const divGallery = document.querySelector(".gallery");
            const projetElement = document.createElement("figure");
            projetElement.dataset.category = infoNewProject.categoryId;
            const imgElement = document.createElement("img");
            imgElement.src = infoNewProject.imageUrl;
            const titleElement = document.createElement("figcaption");
            titleElement.textContent =infoNewProject.title;
            divGallery.appendChild(projetElement);
            projetElement.appendChild(imgElement);
            projetElement.appendChild(titleElement);
            document.querySelector("#add_project form").reset();
            const previewImage = document.querySelector("#add_project img")
            previewImage.remove();
            const divAddPictureContent = document.querySelectorAll(".add_picture *");
                divAddPictureContent.forEach(element => {
                    element.style.display = "block";
                });
            
        } else {
            errorMessage.textContent = "les informations renseignées ne sont pas valides";
            errorMessage.style.color = "red";
            errorMessage.style.textAlign = "center";
        };
    });
};

export {
    displayAddProjectPopUp,
    formListCategory,
    addImage,
    validateInputs,
    addProject,
}