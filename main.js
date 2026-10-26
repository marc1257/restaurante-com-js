import { contagem } from './functions/script.js';
import { carregarCardapio } from './functions/cardapio.js';



carregarCardapio();
contagem();

 const url = `https://tech4produtos.fly.dev/produtos/restaurante=${encodeURIComponent("Restaurante Sabores")}`;

const buscarPorId = async (id) => {

        const resposta = await fetch(`https://tech4produtos.fly.dev/produtos/${id}`);
        const produtoJson = await resposta.json();
        return produtoJson;
      
};
const exibirDetalhes = (produto) => {
    const containerDetalhe = document.getElementById("detalhe-produto");
    
    if (!containerDetalhe) return;

    if (!produto) {
        containerDetalhe.innerHTML = `
            <a href="index.html" class="btn btn-secondary mb-3">Voltar</a>
            <p class="text-danger">Produto não encontrado ou ID inválido.</p>
        `;
        return;
    }

    
    containerDetalhe.innerHTML = `
        <a href="index.html" class="btn btn-outline-secondary mb-3">Voltar</a>
        <div class="card p-3 shadow-sm">
            <img src="${produto.imagem}" alt="${produto.produto}" class="img-fluid mb-3" style="max-width: 300px;">
            <h2>${produto.produto}</h2>
            <p><strong>Descrição:</strong> ${produto.descricao}</p>
            <p><strong>Restaurante:</strong> ${produto.restaurante}</p>
        </div>
    `;
};


(async function carregarPaginaDetalhes() {
    const parametrosNaUrl = new URLSearchParams(window.location.search);
    const produtoId = parametrosNaUrl.get("produto");

    console.log("ID capturado da URL:", produtoId); // Para conferir no F12

    if (produtoId) {
        const produto = await buscarPorId(produtoId);
        exibirDetalhes(produto);
    } else {
        exibirDetalhes(null);
    }
})();