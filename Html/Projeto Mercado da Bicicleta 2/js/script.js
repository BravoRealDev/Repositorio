// script.js
document.addEventListener('DOMContentLoaded', function() {
    const carrinhoSidebar = document.getElementById('carrinhoSidebar');
    const abrirCarrinho = document.getElementById('abrirCarrinho');
    const fecharCarrinho = document.getElementById('fecharCarrinho');

    abrirCarrinho.addEventListener('click', function(e) {
        e.preventDefault();
        carrinhoSidebar.classList.add('ativo');
    });

    fecharCarrinho.addEventListener('click', function() {
        carrinhoSidebar.classList.remove('ativo');
    });
});