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
            document.querySelector("[name=email]")
            .classList.add("invalid");
            document.querySelector("[name=password]")
            .classList.add("invalid");
            const messError = document.querySelector(".mess_error");
            messError.textContent = "Erreur dans l’identifiant ou le mot de passe";
        };
    });
};

attemptLogIn();