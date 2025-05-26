// Inicializa o carrinho a partir do localStorage ou cria um novo
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');

    if (!cartItemsDiv || !cartCountSpan || !cartTotalSpan) return;

    cartItemsDiv.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>O carrinho está vazio.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div>
                    <h6>${item.name}</h6>
                    <p>R$ ${item.price.toFixed(2)} x 
                        <input type="number" min="1" value="${item.quantity}" style="width: 60px;" onchange="changeQuantity(${index}, this.value)">
                    </p>
                </div>
                <div>
                    <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
                    <button class="btn btn-danger btn-sm ms-3" onclick="removeItem(${index})">Remover</button>
                </div>
            `;
            cartItemsDiv.appendChild(itemDiv);
            total += item.price * item.quantity;
        });
    }

    cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotalSpan.textContent = total.toFixed(2);
    saveCart();
}

function adicionarAoCarrinho(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price: parseFloat(price), quantity: 1 });
    }
    updateCartDisplay();
    alert(`${name} adicionado ao carrinho!`);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function changeQuantity(index, newQuantity) {
    const qty = parseInt(newQuantity);
    if (qty < 1) {
        removeItem(index);
    } else {
        cart[index].quantity = qty;
        updateCartDisplay();
    }
}

// Sistema de busca
function initializeSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const productList = document.getElementById('product-list');

    if (!searchForm) return;

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();

        if (productList) { // Só filtra se estiver na página de produtos
            const products = productList.querySelectorAll('.product-item');
            products.forEach(product => {
                const title = product.querySelector('.card-title').textContent.toLowerCase();
                const description = product.querySelector('.card-text').textContent.toLowerCase();
                if (title.includes(query) || description.includes(query)) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        } else {
            // Redireciona para a página de produtos com a query na URL
            window.location.href = `produtos.html?search=${encodeURIComponent(query)}`;
        }
    });

    // Verifica se há uma query na URL ao carregar a página de produtos
    if (productList && window.location.search) {
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('search');
        if (query) {
            searchInput.value = query;
            searchForm.dispatchEvent(new Event('submit'));
        }
    }
}

// Adiciona eventos aos botões "Adicionar ao Carrinho"
function initializeCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = button.getAttribute('data-price');
            adicionarAoCarrinho(name, price);
        });
    });
}

// Lógica para o formulário de contato
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensagem enviada com sucesso!');
            form.reset();
        });
    }
}

// Inicializa tudo ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    updateCartDisplay();
    initializeCartButtons();
    initializeContactForm();
    initializeSearch();
});