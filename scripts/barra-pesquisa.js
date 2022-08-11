import { requisicoes } from "./requisicoes.js";
import { ajustes } from "./suport.js";

const pesquisarBtn = document.querySelector("[data-btn]");
const pesquisarBarra = document.querySelector("[data-filtro]");

const containerSection = document.querySelector(".container-section-items");

pesquisarBtn.addEventListener("click", function () {
    if (pesquisarBarra.value.length > 0) {
        let valorProcurado = pesquisarBarra.value.toLowerCase();

        let location = window.location;

        requisicoes.requisicaoGetFilter(valorProcurado).then((data) => {
            if (data.length > 0) {
                if (location.pathname.includes("index")) {
                    const categorias = data.reduce(function (ac, item) {
                        if (!ac.includes(item.categoria)) {
                            ac.push(item.categoria);
                        }
                        return ac;
                    }, []);

                    containerSection.innerHTML = categorias
                        .map((categoria) => {
                            let innerHTML = `
                                <section>
                                    <div class="titulo-section-items">
                                        <h3 id="${categoria}" class="titulo">${categoria}</h3>
                                        <a href="produtos.html">
                                            Ver tudo
                                            <i class="fa-solid fa-arrow-right-long"></i>
                                        </a>
                                    </div>
                                    <div class="container-item">
                                        ${ajustes.gerarItens(
                                            ajustes.filtraItensPorCategoria(
                                                data,
                                                categoria
                                            )
                                        )}
                                    </div>        
                                </section>`;

                            return innerHTML;
                        })
                        .join("");
                } else {
                    containerSection.innerHTML = ajustes.gerarItens(data);

                    const itens = document.querySelectorAll(".item");

                    itens.forEach((item) => {
                        item.appendChild(ajustes.criaButtonExcluir());
                        item.appendChild(ajustes.criaButtonEditar());
                    });
                }
            }
        });
    }
});
