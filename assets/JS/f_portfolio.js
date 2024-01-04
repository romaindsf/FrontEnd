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

export {
    generrateportfolio,
    filterButton,
};