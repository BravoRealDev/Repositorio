class CarrinhoDeCompras {
    constructor() {
        console.log('CarrinhoDeCompras inicializado');
        this.items = JSON.parse(localStorage.getItem('carrinho')) || [];
        console.log('Itens carregados do localStorage:', this.items);
        this.atualizarTabelaCarrinho();
        this.atualizarQuantidadeCarrinho();
    }

    adicionarItem(produto, quantidade = 1) {
        console.log('Adicionando item:', produto, 'Quantidade:', quantidade);
        const itemExistente = this.items.find(item => item.id === produto.id);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
            console.log('Quantidade incrementada:', itemExistente);
        } else {
            produto.quantidade = quantidade;
            this.items.push(produto);
            console.log('Novo item adicionado:', produto);
        }
        this.salvarCarrinho();
        this.atualizarTabelaCarrinho();
        this.atualizarQuantidadeCarrinho();
        this.mostrarMensagemSucesso();
    }

    removerItem(id, quantidade = 1) {
        console.log('Removendo item com ID:', id, 'Quantidade:', quantidade);
        const itemExistente = this.items.find(item => item.id === id);

        if (!itemExistente) {
            console.log('Item não encontrado no carrinho.');
            return;
        }

        if (quantidade >= itemExistente.quantidade) {
            this.removerItemTotalmente(id); // Remove o item totalmente
        } else {
            itemExistente.quantidade -= quantidade;
            console.log('Quantidade decrementada:', itemExistente);
            this.salvarCarrinho();
        }

        this.atualizarTabelaCarrinho();
        this.atualizarQuantidadeCarrinho();
    }

    removerItemTotalmente(id) {
        console.log('Removendo item totalmente com ID:', id);
        this.items = this.items.filter(item => item.id !== id);
        this.salvarCarrinho();
        this.atualizarTabelaCarrinho();
        this.atualizarQuantidadeCarrinho();
    }

    limparCarrinho() {
        console.log('Limpando o carrinho completamente');
        this.items = [];
        this.salvarCarrinho();
        this.atualizarTabelaCarrinho();
        this.atualizarQuantidadeCarrinho();
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
                <td data-label="Nome">${item.nome}</td>
                <td data-label="Preço">R$ ${item.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td data-label="Quantidade">${item.quantidade}</td>
                <td data-label="Total">R$ ${(item.preco * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td data-label="Ações" class="carrinho-acoes">
                    <button class="btn btn-outline-success btn-sm aumentar-quantidade" data-id="${item.id}">+</button>
                    <button class="btn btn-outline-danger btn-sm diminuir-quantidade" data-id="${item.id}">-</button>
                    <button class="btn btn-outline-danger btn-sm remover-item" data-id="${item.id}">Excluir</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        document.querySelectorAll('.aumentar-quantidade').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                console.log('Clique em aumentar quantidade do item com ID:', id);
                this.adicionarItem({ id: id }, 1);
            });
        });

        document.querySelectorAll('.diminuir-quantidade').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                console.log('Clique em diminuir quantidade do item com ID:', id);
                this.removerItem(id, 1);
            });
        });

        document.querySelectorAll('.remover-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.id);
                console.log('Clique em remover item totalmente com ID:', id);
                this.removerItemTotalmente(id);
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
        mensagem.style.display = 'block';
        setTimeout(() => {
            mensagem.style.display = 'none';
        }, 1500);
    }
}


function removerAcentos(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// Adicionado Ícone de Limpar Busca
function adicionarIconeLimparBusca() {
    const searchInput = document.getElementById('searchInput');
    const searchForm = searchInput.closest('form');

    if (!searchInput || !searchForm) {
        console.error('Elemento de busca não encontrado.');
        return;
    }

    const clearButton = document.createElement('button');
    clearButton.type = 'button';
    clearButton.innerHTML = '×'; // Ícone "x"
    clearButton.classList.add('clear-search-button');

    // Adicione um estilo básico para posicionar o botão
    clearButton.style.position = 'absolute';
    clearButton.style.right = '5px';
    clearButton.style.top = '50%';
    clearButton.style.transform = 'translateY(-50%)';
    clearButton.style.background = 'none';
    clearButton.style.border = 'none';
    clearButton.style.cursor = 'pointer';
    clearButton.style.fontSize = '1.2em';

    // Adicione o botão logo após o input
    searchInput.parentNode.insertBefore(clearButton, searchInput.nextSibling);

    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
    });

    // Ajuste o estilo do form para posicionamento relativo, se necessário
    searchForm.style.position = 'relative';
}


document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = removerAcentos(document.getElementById('searchInput').value);
    const produtos = document.querySelectorAll('.produto-card');

    produtos.forEach(produto => {
        const nomeProduto = removerAcentos(produto.querySelector('h3').textContent);
        if (nomeProduto.includes(searchTerm)) {
            produto.style.display = 'block';
        } else {
            produto.style.display = 'none';
        }
    });
});


const carrinho = new CarrinhoDeCompras();

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

        // Solicita a quantidade ao usuário
        const quantidade = parseInt(prompt(`Quantas unidades de ${produto.nome} você deseja adicionar?`, '1'));

        if (isNaN(quantidade) || quantidade <= 0) {
            alert('Quantidade inválida. Adicionando 1 unidade.');
            carrinho.adicionarItem(produto, 1);
        } else {
            carrinho.adicionarItem(produto, quantidade);
        }


    });
});

document.getElementById('finalizarCompra').addEventListener('click', () => {
    console.log('Botão "Finalizar Compra" clicado');
    if (carrinho.items.length === 0) {
        alert('Seu carrinho está vazio!');
    } else {
        alert('Compra finalizada com sucesso!');
        carrinho.items = [];
        carrinho.salvarCarrinho();
        carrinho.atualizarTabelaCarrinho();
        carrinho.atualizarQuantidadeCarrinho();
    }
});

document.getElementById('limparCarrinho').addEventListener('click', () => {
    carrinho.limparCarrinho();
});


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

    adicionarIconeLimparBusca(); // Chama a função para adicionar o ícone quando a página carrega
});