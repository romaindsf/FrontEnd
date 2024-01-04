//Déclarer Variable
// const emailRegex = /\S+@\S+\.\S+/

//Formulaire
function attemptLogIn () {
    const loginForm = document.getElementById("logIn");
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        const logInfo = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=password]").value,
            };
            const attemptLogIn = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                body: JSON.stringify(logInfo),
                headers: {"Content-Type": "application/json"},
            });
            if(attemptLogIn.status === 200) {
                const logs = await attemptLogIn.json();
                window.localStorage.setItem("logs", logs.token);
                window.location.href = "index.html";
            } else {
                console.log("Erreur dans l’identifiant ou le mot de passe")
                document.querySelector("[name=email]")
                .classList.add("invalid")
                document.querySelector("[name=password]")
                .classList.add("invalid")
                const messError = document.createElement("p");
                messError.textContent = "Erreur dans l’identifiant ou le mot de passe.";
                loginForm.insertBefore(messError, loginForm.childNodes[4]);
                messError.classList.add("mess_error");
            }
    })
}

attemptLogIn();

//     if (emailRegex.test(event.target.querySelector("[name=email]").value)) {
//         attemptLogIn(event);
//     } else {
//         document.querySelector("[name=email]")
//             .classList.add("invalid")
//         const messError = document.createElement("p").textContent("E-mail invalide.");
//         loginForm.insertBefore(messError, loginForm.childNodes[2]);
//     };
