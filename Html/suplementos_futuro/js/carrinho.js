document.addEventListener('DOMContentLoaded', () => {
    const carrinhoLista = document.querySelector('.carrinho-lista');
    const carrinhoSubtotal = document.getElementById('carrinho-subtotal');
    const carrinhoFrete = document.getElementById('carrinho-frete');
    const carrinhoTotal = document.getElementById('carrinho-total');
    const finalizarCompraButton = document.getElementById('finalizar-compra');
    const carrinhoVazio = document.querySelector('.carrinho-vazio');

    // Funções auxiliares para manipular o carrinho no localStorage
    function getCartItems() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    }

    function saveCartItems(items) {
        localStorage.setItem('cart', JSON.stringify(items));
    }

    // Função para exibir os itens do carrinho na página
    function displayCart() {
        const cartItems = getCartItems();
        carrinhoLista.innerHTML = ''; // Limpa a lista
    
        if (cartItems.length === 0) {
            carrinhoVazio.style.display = 'block';
            return;
        } else {
            carrinhoVazio.style.display = 'none';
        }
    
        let subtotal = 0;
    
        cartItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('carrinho-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.nome}">
                <div>
                    <h3>${item.nome}</h3>
                    <p class="preco">R$ ${item.preco.toFixed(2)}</p>
                    <div class="quantidade">
                        <label for="quantidade-${index}">Quantidade:</label>
                        <input type="number" id="quantidade-${index}" value="${item.quantidade}" min="1" data-index="${index}">
                    </div>
                </div>
                <button class="remover-item" data-index="${index}">Remover</button>
            `;
            carrinhoLista.appendChild(itemElement);
            subtotal += item.preco * item.quantidade;
        });
    
        updateCartTotal(subtotal);
    }
    

    // Função para atualizar os totais do carrinho (subtotal, frete, total)
    function updateCartTotal(subtotal) {
        const frete = subtotal > 200 ? 0 : 20; // Frete grátis acima de R$ 200
        const total = subtotal + frete;

        carrinhoSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
        carrinhoFrete.textContent = `R$ ${frete.toFixed(2)}`;
        carrinhoTotal.textContent = `R$ ${total.toFixed(2)}`;
    }

    // Event listener para remover um item do carrinho
    carrinhoLista.addEventListener('click', (event) => {
        if (event.target.classList.contains('remover-item')) {
            const index = event.target.dataset.index;
            let cartItems = getCartItems();
            cartItems.splice(index, 1);
            saveCartItems(cartItems);
            displayCart(); // Atualiza a exibição do carrinho
            updateCartCount(); // Atualiza o contador no header (se necessário)
        }
    });

    // Event listener para atualizar a quantidade de um item
    carrinhoLista.addEventListener('change', (event) => {
        if (event.target.tagName === 'INPUT' && event.target.type === 'number') {
            const index = event.target.dataset.index;
            const newQuantity = parseInt(event.target.value);
            if (newQuantity > 0) {
                let cartItems = getCartItems();
                cartItems[index].quantidade = newQuantity;
                saveCartItems(cartItems);
                displayCart();
                updateCartCount(); // Atualiza o contador no header (se necessário)
            } else {
                alert('A quantidade deve ser maior que zero.');
                event.target.value = 1; // Reseta para 1
            }
        }
    });

    // Event listener para finalizar a compra (simples redirecionamento)
    finalizarCompraButton.addEventListener('click', () => {
        alert('Redirecionando para a página de checkout...');
        // window.location.href = '/checkout'; // Substitua por sua página de checkout
    });

    // Funções adicionais (se precisar)

    // Atualiza o contador do carrinho no header
    function updateCartCount() {
        const cartItems = getCartItems();
        const cartCount = cartItems.reduce((total, item) => total + item.quantidade, 0); // Soma as quantidades
        const cartCountElement = document.querySelector('header .carrinho-count');
        cartCountElement.textContent = cartCount;
    }

    // Exibe o carrinho ao carregar a página
    displayCart();

    // Atualiza o contador do carrinho no carregamento da página
    updateCartCount();
});