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

// Função para atualizar o contador do carrinho no header
function updateCartCount() {
  const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const cartCount = cartItems.reduce((total, item) => total + item.quantidade, 0);
  const cartCountElement = document.querySelector('header .carrinho-count');
  cartCountElement.textContent = cartCount;
}

// Chame a função para atualizar o contador no carregamento da página
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});

// Exemplo: Adicionar funcionalidade ao carrinho (completo)
const botoesAdicionarCarrinho = document.querySelectorAll('.produto a');
const carrinhoCount = document.querySelector('.carrinho-count');
const carrinhoLista = document.querySelector('.carrinho-lista');
const carrinhoSubtotal = document.querySelector('.carrinho-subtotal');
const carrinhoFrete = document.querySelector('.carrinho-frete');
const carrinhoTotal = document.querySelector('.carrinho-total');

let count = 0;
let cart = [];

botoesAdicionarCarrinho.forEach(botao => {
  botao.addEventListener('click', function(event) {
    event.preventDefault();
    count++;
    carrinhoCount.textContent = count;

    const produto = {
      id: botao.dataset.id,
      nome: botao.dataset.nome,
      preco: botao.dataset.preco,
      quantidade: 1
    };

    const existingItem = cart.find(item => item.id === produto.id);

    if (existingItem) {
      existingItem.quantidade++;
    } else {
      cart.push(produto);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  });
}

function updateCart() {
  const cartItems = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const cartCount = cartItems.reduce((total, item) => total + item.quantidade, 0);
  const cartSubtotal = cartItems.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  const cartFrete = cartSubtotal > 100 ? 0 : 10;
  const cartTotal = cartSubtotal + cartFrete;

  carrinhoCount.textContent = cartCount;
  carrinhoLista.innerHTML = '';
  carrinhoSubtotal.textContent = cartSubtotal.toFixed(2);
  carrinhoFrete.textContent = cartFrete.toFixed(2);
  carrinhoTotal.textContent = cartTotal.toFixed(2);

  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} x ${item.quantidade}`;
    carrinhoLista.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateCart();
});

// Exemplo: Remover item do carrinho
const carrinhoLista = document.querySelector('.carrinho-lista');

carrinhoLista.addEventListener('click', function(event) {
  if (event.target.tagName === 'BUTTON') {
    const itemId = event.target.dataset.id;
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
}

// Exemplo: Alterar quantidade do item no carrinho
const carrinhoLista = document.querySelector('.carrinho-lista');

carrinhoLista.addEventListener('change', function(event) {
  if (event.target.tagName === 'INPUT') {
    const itemId = event.target.dataset.id;
    const itemQuantidade = parseInt(event.target.value);
    const item = cart.find(item => item.id === itemId);
    item.quantidade = itemQuantidade;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  }
}

// Exemplo: Limpar carrinho

const carrinhoLimpar = document.querySelector('.carrinho-limpar');

carrinhoLimpar.addEventListener('click', function() {
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
}

// Exemplo: Adicionar funcionalidade de filtro
const filtro = document.querySelector('.filtro');
const produtos = document.querySelectorAll('.produto');

filtro.addEventListener('change', function() {
  const filtroValor = filtro.value;

  produtos.forEach(produto => {
    if (filtroValor === 'todos') {
      produto.style.display = 'block';
    } else if (produto.dataset.categoria === filtroValor) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
}

