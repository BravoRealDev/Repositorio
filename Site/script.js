let carrinho = [];
let subtotal = 0;
const taxaImposto = 0.2725; // 10% de imposto

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

function atualizarCarrinho() {
    const listaCarrinho = document.getElementById('lista-carrinho');
    listaCarrinho.innerHTML = '';
    subtotal = 0;

    carrinho.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
        listaCarrinho.appendChild(li);
        subtotal += item.preco;
    });

    const imposto = subtotal * taxaImposto;
    const total = subtotal + imposto;

    document.getElementById('subtotal').textContent = subtotal.toFixed(2);
    document.getElementById('imposto').textContent = imposto.toFixed(2);
    document.getElementById('total').textContent = total.toFixed(2);
}

function finalizarCompra() {
    alert('Compra finalizada! Obrigado por escolher o FAZ O L.');
    carrinho = [];
    atualizarCarrinho();
}