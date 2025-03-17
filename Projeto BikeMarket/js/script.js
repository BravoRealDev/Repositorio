class CarrinhoDeCompras {
    constructor() {
        console.log('CarrinhoDeCompras inicializado');
        this.items = JSON.parse(localStorage.getItem('carrinho')) || [];
        console.log('Itens carregados do localStorage:', this.items);
        this.atualizarTabelaCarrinho();
        this.atualizarQuantidadeCarrinho(); // Atualiza a quantidade ao carregar a página
    }

    adicionarItem(produto) {
        console.log('Adicionando item:', produto);
        const itemExistente = this.items.find(item => item.id === produto.id);
        if (itemExistente) {
            itemExistente.quantidade += 1;
            console.log('Quantidade incrementada:', itemExistente);
        } else {
            produto.quantidade = 1;
            this.items.push(produto);
            console.log('Novo item adicionado:', produto);
        }
        this.salvarCarrinho();
        this.atualizarTabelaCarrinho();
        this.atualizarQuantidadeCarrinho(); // Atualiza a quantidade após adicionar
        this.mostrarMensagemSucesso(); // Mostra a mensagem de sucesso
    }

    removerItem(id) {
        console.log('Removendo item com ID:', id);
        this.items = this.items.filter(item => item.id !== id);
        this.salvarCarrinho();
        this.atualizarTabelaCarrinho();
        this.atualizarQuantidadeCarrinho(); // Atualiza a quantidade após remover
    }

    salvarCarrinho() {
        localStorage.setItem('carrinho', JSON.stringify(this.items));
        console.log('Carrinho salvo no localStorage:', this.items);
    }

    atualizarTabelaCarrinho() {
        console.log('Atualizando tabela do carrinho');
        const tbody = document.querySelector('#carrinho tbody');
        if (!tbody) {
            console.error('Elemento tbody não encontrado');
            return;
        }
        tbody.innerHTML = '';

        this.items.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.nome}</td>
                <td>R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${(item.preco * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td><button class="btn btn-danger btn-sm remover-item" data-id="${item.id}">Remover</button></td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.remover-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                console.log('Clique em remover item com ID:', id);
                this.removerItem(id);
            });
        });

        this.atualizarTotal();
    }

    atualizarTotal() {
        console.log('Atualizando total');
        const total = this.items.reduce((acc, item) => acc + (item.preco * item.quantidade), 0);
        const totalElement = document.getElementById('carrinho-total');
        if (!totalElement) {
            const carrinhoSection = document.getElementById('carrinho');
            const totalDiv = document.createElement('div');
            totalDiv.id = 'carrinho-total';
            totalDiv.style.textAlign = 'right';
            totalDiv.innerHTML = `<strong>Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>`;
            carrinhoSection.appendChild(totalDiv);
        } else {
            totalElement.innerHTML = `<strong>Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>`;
        }
    }

    atualizarQuantidadeCarrinho() {
        const quantidade = this.items.reduce((acc, item) => acc + item.quantidade, 0);
        const quantidadeElement = document.getElementById('quantidade-carrinho');
        if (quantidadeElement) {
            quantidadeElement.textContent = quantidade;
        }
    }

    mostrarMensagemSucesso() {
        const mensagem = document.getElementById('mensagem-sucesso');
        mensagem.style.display = 'block'; // Mostra a mensagem
        setTimeout(() => {
            mensagem.style.display = 'none'; // Oculta a mensagem após 1,5 segundos
        }, 1500);
    }
}

// Instancia o carrinho
const carrinho = new CarrinhoDeCompras();

// Adiciona eventos aos botões "Adicionar ao Carrinho"
document.querySelectorAll('.produto-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        console.log('Botão "Adicionar ao Carrinho" clicado');
        const card = e.target.closest('.produto-card');
        if (!card) {
            console.error('Card não encontrado');
            return;
        }
        const precoTexto = card.querySelector('p').textContent.replace('R$ ', '').replace('.', '').replace(',', '.');
        const produto = {
            id: Date.now(),
            nome: card.querySelector('h3').textContent,
            preco: parseFloat(precoTexto),
        };
        console.log('Produto a ser adicionado:', produto);
        carrinho.adicionarItem(produto);
    });
});

// Evento para o botão "Finalizar Compra"
document.getElementById('finalizarCompra').addEventListener('click', () => {
    console.log('Botão "Finalizar Compra" clicado');
    if (carrinho.items.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        alert('Compra finalizada com sucesso!');
        carrinho.items = []; // Limpa o carrinho
        carrinho.salvarCarrinho(); // Atualiza o localStorage
        carrinho.atualizarTabelaCarrinho(); // Atualiza a tabela
        carrinho.atualizarQuantidadeCarrinho(); // Atualiza o ícone de quantidade
    }
});

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