//Get
const requisicaoGet = fetch("http://localhost:3000/produtos").then(
    (response) => {
        return response.json();
    }
);

//post
const requisicaoPost = (categoria, img, nome, descricao, preco) => {
    return fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            categoria: categoria,
            img: img,
            nome: nome,
            descricao: descricao,
            preco: preco,
        }),
    }).then((response) => {
        if (response.ok) {
            return response.body;
        }
    });
};

// // delete
const requisicaoDelete = (id) => {
    fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
    });
};

// get especifico
const requisicaoGetEspecific = (id) => {
    const data = fetch(`http://localhost:3000/produtos/${id}`).then(
        (response) => {
            return response.json();
        }
    );

    return data;
};

// Put
const requisicaoPut = (categoria, img, nome, descricao, preco, id) => {
    return fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            categoria: categoria,
            img: img,
            nome: nome,
            descricao: descricao,
            preco: preco,
        }),
    }).then((response) => {
        if (response.ok) {
            return response.body;
        }
        throw Error;
    });
};

export const requisicoes = {
    requisicaoGet,
    requisicaoPost,
    requisicaoDelete,
    requisicaoGetEspecific,
    requisicaoPut,
};
