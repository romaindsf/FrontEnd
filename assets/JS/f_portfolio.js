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

function generateFilterButton (categories) {
    const divFiltres = document.querySelector(".filtres");
    const btnAll = document.createElement("button");
    btnAll.classList.add("btn");
    btnAll.setAttribute("type", "button");
    btnAll.textContent = "Tous";
    divFiltres.appendChild(btnAll);
    for (let i = 0; i < categories.length; i++) {
        const btnFiltres = document.createElement("button");
        btnFiltres.classList.add("btn");
        btnFiltres.setAttribute("type", "button");
        btnFiltres.textContent = categories[i].name;
        divFiltres.appendChild(btnFiltres)
        
    };
};

function filterButton (categories) {
    const listProjet = document.querySelectorAll(".gallery figure");
    const btnAll = document.querySelector(".filtres .btn:first-child");
    const btnCategories = document.querySelectorAll(".btn");
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

export {
    generrateportfolio,
    generateFilterButton,
    filterButton,
};