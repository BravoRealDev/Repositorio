// script.js

// Exemplo: Adicionar funcionalidade ao carrinho (simples)
const botoesAdicionarCarrinho = document.querySelectorAll('.produto a');
const carrinhoCount = document.querySelector('.carrinho-count');

let count = 0;

botoesAdicionarCarrinho.forEach(botao => {
  botao.addEventListener('click', function(event) {
    event.preventDefault();
    count++;
    carrinhoCount.textContent = count;
  });
});

// Adicione mais funcionalidades aqui (validação de formulários, etc.)