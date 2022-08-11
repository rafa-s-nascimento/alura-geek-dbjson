import { requisicoes } from "./requisicoes.js";

const alterar = JSON.parse(sessionStorage.getItem("alterar")).status;

const form = document.querySelector("[data-form]");
let categoria = document.querySelector("#categoria-produto");
let img = document.querySelector("#img-url-produto");
let nome = document.querySelector("#nome-produto");
let descricao = document.querySelector("#descricao-produto");
let preco = document.querySelector("#preco-produto");
const adicionarAlterarBtn = document.querySelector(".add-produto-btn");

let urlId = parseInt(window.location.search.replace("?id=", ""));

if (alterar) {
    form.querySelector("h3").textContent = "Alterar Produto";
    adicionarAlterarBtn.textContent = "Alterar Produto";

    requisicoes.requisicaoGetEspecific(urlId).then((data) => {
        categoria.value = data.categoria;
        img.value = data.img;
        nome.value = data.nome;
        descricao.value = data.descricao;
        preco.value = data.preco;
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let categoriaValue = categoria.value;
    let imgValue = img.value;
    let nomeValue = nome.value;
    let descricaoValue = descricao.value;
    let precoValue = preco.value;

    const inputs = document.querySelectorAll(".input");

    inputs.forEach((input) => {
        input.value = "";
    });

    if (!alterar) {
        requisicoes
            .requisicaoPost(
                categoriaValue,
                imgValue,
                nomeValue,
                descricaoValue,
                precoValue
            )
            .then((response) => {
                window.location.href = "./administrar-produtos.html";
                console.log(response);
            });
    } else {
        requisicoes
            .requisicaoPut(
                categoriaValue,
                imgValue,
                nomeValue,
                descricaoValue,
                precoValue,
                urlId
            )
            .then((response) => {
                window.location.href = "./administrar-produtos.html";
                console.log(response);
            });
    }
});

preco.addEventListener("keydown", function (e) {
    console.log(e.key);
    if (!checarInputPreco(e.key) && e.key !== "Backspace") {
        e.preventDefault();
    }
});

function checarInputPreco(num) {
    let pattern = /\d+/;

    return pattern.test(num);
}
