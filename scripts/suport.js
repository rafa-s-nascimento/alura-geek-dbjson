import { requisicoes } from "./requisicoes.js";

function formatarPreco(valor) {
    let pattern = /\d+\.\d{2}/;
    let newValue = valor.toString();

    if (!newValue.includes(".")) {
        newValue = valor + ".";
    }

    while (!newValue.match(pattern)) {
        newValue = newValue + 0;
    }

    return newValue.replace(".", ",");
}

function gerarItens(array) {
    let innerHTML = array
        .map(function (produto) {
            return `<div class="item" data-id="${produto.id}">
                                <div class="container-img">
                                    <img src="${
                                        produto.img
                                    }" alt="${produto.nome}">
                                </div>
                                <p class="nome-produto">${produto.nome}</p>
                                <p class="preco-produto">R$ ${formatarPreco(
                                    produto.preco
                                )}</p>
                                <a href="./detalhe-produto.html?id=${
                                    produto.id
                                }" class="link-produto">Ver produto</a>
                    </div>`;
        })
        .join("");
    return innerHTML;
}

function filtraItensPorCategoria(dados, categoria) {
    let itensCategoria = dados.filter((item) => {
        return item.categoria === categoria;
    });

    return itensCategoria;
}

function criaButtonExcluir() {
    const btn = document.createElement("button");
    btn.classList.add("excluir");

    const conteudo = document.createElement("i");
    conteudo.classList.add("fa-solid");
    conteudo.classList.add("fa-trash");

    btn.appendChild(conteudo);

    btn.addEventListener("click", (e) => {
        const parentId = parseInt(e.currentTarget.parentElement.dataset.id);

        console.log(parentId);

        requisicoes.requisicaoDelete(parentId);
    });

    return btn;
}

function criaButtonEditar() {
    const btn = document.createElement("button");
    btn.classList.add("editar");

    const conteudo = document.createElement("i");
    conteudo.classList.add("fa-solid");
    conteudo.classList.add("fa-pen");

    btn.appendChild(conteudo);

    btn.addEventListener("click", (e) => {
        const parentId = parseInt(e.currentTarget.parentElement.dataset.id);

        console.log(parentId);

        sessionStorage.setItem("alterar", JSON.stringify({ status: true }));

        window.location.href = `./adicionar-produto.html?id=${parentId}`;
    });

    return btn;
}

export const ajustes = {
    gerarItens,
    formatarPreco,
    filtraItensPorCategoria,
    criaButtonExcluir,
    criaButtonEditar,
};
