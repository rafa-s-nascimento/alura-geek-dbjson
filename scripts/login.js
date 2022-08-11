const login = document.querySelector("input[type=email]");
const password = document.querySelector("input[type=password]");
const form = document.querySelector("form");

login.value = "admin@email.com";
password.value = "admin";

form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(
        `http://localhost:3000/login?email=${login.value}&senha=${password.value}`
    )
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log("this is the catch " + err);
        })
        .then((response) => {
            if (response.length > 0) {
                window.location.href = "./administrar-produtos.html";
            } else {
                login.style.borderColor = "red";
                password.style.borderColor = "red";
            }
        });
});
