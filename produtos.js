let produtos = [];
let idCounter = 1;
let editIndex = null;

function adicionarProduto() {
    const descricao = document.getElementById('descricao').value;
    const marca = document.getElementById('marca').value;
    const unidade = document.getElementById('unidade').value;
    const fatorMultiplicacao = parseFloat(document.getElementById('fatorMultiplicacao').value);
    const apelido = document.getElementById('apelido').value;
    const estoqueMinimo = parseInt(document.getElementById('estoqueMinimo').value);
    const estoqueMaximo = parseInt(document.getElementById('estoqueMaximo').value);

    const produto = {
        id: idCounter++,
        descricao,
        marca,
        unidade,
        fatorMultiplicacao,
        apelido,
        estoqueMinimo,
        estoqueMaximo
    };

    produtos.push(produto);
    exibirProdutos();
    limparFormulario();
}

function exibirProdutos() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '<h3>Produtos Cadastrados</h3>';

    produtos.forEach((produto, index) => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <p><strong>ID:</strong> ${produto.id}</p>
            <p><strong>Descrição:</strong> ${produto.descricao}</p>
            <p><strong>Marca:</strong> ${produto.marca}</p>
            <p><strong>Unidade:</strong> ${produto.unidade}</p>
            <p><strong>Fator de Multiplicação:</strong> ${produto.fatorMultiplicacao}</p>
            <p><strong>Apelido:</strong> ${produto.apelido}</p>
            <p><strong>Estoque Mínimo:</strong> ${produto.estoqueMinimo}</p>
            <p><strong>Estoque Máximo:</strong> ${produto.estoqueMaximo}</p>
            <button class="edit" onclick="editarProduto(${index})">Editar</button>
            <button onclick="excluirProduto(${index})">Excluir</button>
        `;
        productList.appendChild(productItem);
    });
}

function limparFormulario() {
    document.getElementById('descricao').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('unidade').value = '';
    document.getElementById('fatorMultiplicacao').value = '';
    document.getElementById('apelido').value = '';
    document.getElementById('estoqueMinimo').value = '';
    document.getElementById('estoqueMaximo').value = '';
    document.getElementById('atualizarBtn').style.display = 'none';
    document.querySelector('.form-group button[onclick="adicionarProduto()"]').style.display = 'inline-block';
}

function editarProduto(index) {
    const produto = produtos[index];

    document.getElementById('descricao').value = produto.descricao;
    document.getElementById('marca').value = produto.marca;
    document.getElementById('unidade').value = produto.unidade;
    document.getElementById('fatorMultiplicacao').value = produto.fatorMultiplicacao;
    document.getElementById('apelido').value = produto.apelido;
    document.getElementById('estoqueMinimo').value = produto.estoqueMinimo;
    document.getElementById('estoqueMaximo').value = produto.estoqueMaximo;

    editIndex = index;
    document.getElementById('atualizarBtn').style.display = 'inline-block';
    document.querySelector('.form-group button[onclick="adicionarProduto()"]').style.display = 'none';
}

function atualizarProduto() {
    const descricao = document.getElementById('descricao').value;
    const marca = document.getElementById('marca').value;
    const unidade = document.getElementById('unidade').value;
    const fatorMultiplicacao = parseFloat(document.getElementById('fatorMultiplicacao').value);
    const apelido = document.getElementById('apelido').value;
    const estoqueMinimo = parseInt(document.getElementById('estoqueMinimo').value);
    const estoqueMaximo = parseInt(document.getElementById('estoqueMaximo').value);

    const produto = {
        id: produtos[editIndex].id,
        descricao,
        marca,
        unidade,
        fatorMultiplicacao,
        apelido,
        estoqueMinimo,
        estoqueMaximo
    };

    produtos[editIndex] = produto;
    exibirProdutos();
    limparFormulario();
    editIndex = null;
}

function excluirProduto(index) {
    produtos.splice(index, 1);
    exibirProdutos();
}
