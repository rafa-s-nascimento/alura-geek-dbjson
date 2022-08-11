import { requisicoes } from "./requisicoes.js";
import { ajustes } from "./suport.js";

sessionStorage.setItem("alterar", JSON.stringify({ status: false }));

const containerItensProdutos = document.querySelector(
    ".container-item-produtos"
);

window.addEventListener("DOMContentLoaded", () => {
    requisicoes.requisicaoGet.then((data) => {
        const conteudo = ajustes.gerarItens(data);

        containerItensProdutos.innerHTML = conteudo;

        const itens = document.querySelectorAll(".item");

        itens.forEach((item) => {
            item.appendChild(ajustes.criaButtonExcluir());
            item.appendChild(ajustes.criaButtonEditar());
        });
    });
});
