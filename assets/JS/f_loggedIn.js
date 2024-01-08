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
    document.body.prepend(editionBanner);
};

function displayModifs (portfolio) {
    const linkModifs = document.createElement("a");
    linkModifs.innerHTML += `<i class="fa-regular fa-pen-to-square"></i>modifier`;
    linkModifs.href = "#";
    linkModifs.classList.add("btnOpenModal");
    portfolio.appendChild(linkModifs);
};

function hideFilterButtons () {
    const btnCategories = document.querySelectorAll(".btn");
    btnCategories.forEach(button => {
        button.style.display = "none";
    });
};

export {
    displayLogout,
    displayEditBanner,
    displayModifs,
    hideFilterButtons,
}