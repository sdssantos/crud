let produtos = [];
let cotacoes = [];

window.onload = function() {
    // Carregar produtos do Firebase
    database.ref('produtos').on('value', snapshot => {
        produtos = [];
        snapshot.forEach(childSnapshot => {
            const produto = childSnapshot.val();
            produto.id = childSnapshot.key;
            produtos.push(produto);
        });
        preencherProdutos();
    });

    // Carregar cotações do Firebase
    database.ref('cotacoes').on('value', snapshot => {
        cotacoes = [];
        snapshot.forEach(childSnapshot => {
            const cotacao = childSnapshot.val();
            cotacao.id = childSnapshot.key;
            cotacoes.push(cotacao);
        });
        exibirCotacoes();
    });
}

function preencherProdutos() {
    const produtoSelect = document.getElementById('produto');
    produtoSelect.innerHTML = '<option value="">Selecione um produto</option>';
    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.id;
        option.textContent = produto.descricao;
        produtoSelect.appendChild(option);
    });

    produtoSelect.onchange = function() {
        const produtoSelecionado = produtos.find(produto => produto.id === this.value);
        if (produtoSelecionado) {
            document.getElementById('marca').value = produtoSelecionado.marca;
            document.getElementById('unidade').value = produtoSelecionado.unidade;
            document.getElementById('fatorMultiplicacao').value = produtoSelecionado.fatorMultiplicacao;
            document.getElementById('apelido').value = produtoSelecionado.apelido;
        } else {
            document.getElementById('marca').value = '';
            document.getElementById('unidade').value = '';
            document.getElementById('fatorMultiplicacao').value = '';
            document.getElementById('apelido').value = '';
        }
    };
}

function adicionarCotacao() {
    const data = document.getElementById('data').value;
    const produtoId = document.getElementById('produto').value;
    const quantidade = parseFloat(document.getElementById('quantidade').value);
    const mes = parseInt(document.getElementById('mes').value);
    const ano = parseInt(document.getElementById('ano').value);
    const valor = parseFloat(document.getElementById('valor').value);
    const fornecedor = document.getElementById('fornecedor').value;

    const produtoSelecionado = produtos.find(produto => produto.id === produtoId);
    if (!produtoSelecionado) {
        alert('Selecione um produto válido.');
        return;
    }

    const cotacao = {
        data,
        produto: produtoSelecionado.descricao,
        marca: produtoSelecionado.marca,
        unidade: produtoSelecionado.unidade,
        quantidade,
        fatorMultiplicacao: produtoSelecionado.fatorMultiplicacao,
        mes,
        ano,
        apelido: produtoSelecionado.apelido,
        valor,
        fornecedor
    };

    const newCotacaoKey = database.ref().child('cotacoes').push().key;
    const updates = {};
    updates['/cotacoes/' + newCotacaoKey] = cotacao;

    database.ref().update(updates)
        .then(() => {
            exibirCotacoes();
            limparFormulario();
        })
        .catch(error => console.error("Erro ao adicionar cotação: ", error));
}

function exibirCotacoes() {
    const quotationList = document.getElementById('quotationList');
    quotationList.innerHTML = '<h3>Cotações Registradas</h3>';

    cotacoes.forEach(cotacao => {
        const quotationItem = document.createElement('div');
        quotationItem.className = 'quotation-item';
        quotationItem.innerHTML = `
            <p><strong>ID:</strong> ${cotacao.id}</p>
            <p><strong>Data:</strong> ${cotacao.data}</p>
            <p><strong>Produto:</strong> ${cotacao.produto}</p>
            <p><strong>Marca:</strong> ${cotacao.marca}</p
