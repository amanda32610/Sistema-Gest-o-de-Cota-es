// Configurações do Firebase
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_DOMINIO",
    projectId: "SEU_PROJECT_ID",
    storageBucket: "SEU_BUCKET",
    messagingSenderId: "SEU_SENDER_ID",
    appId: "SUA_APP_ID"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Referência para o formulário e tabela
const addProductForm = document.getElementById('addProductForm');
const inventoryTable = document.getElementById('inventoryTable');

// Adicionar produto
addProductForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Coletar os valores do formulário
    const pn = document.getElementById('productPN').value;
    const descricao = document.getElementById('productDescription').value;
    const quantidade = document.getElementById('productQuantity').value;
    const unidade = document.getElementById('productUnit').value;
    const ultimoOrcamento = document.getElementById('productLastQuote').value;

    const fornecedor1 = document.getElementById('productSupplier1').value;
    const precoFornecedor1 = document.getElementById('productPriceSupplier1').value;

    const fornecedor2 = document.getElementById('productSupplier2').value;
    const precoFornecedor2 = document.getElementById('productPriceSupplier2').value;

    const fornecedor3 = document.getElementById('productSupplier3').value;
    const precoFornecedor3 = document.getElementById('productPriceSupplier3').value;

    // Adicionar produto ao Firestore
    db.collection('produtos').add({
        pn: pn,
        descricao: descricao,
        quantidade: parseInt(quantidade),
        unidade: unidade,
        ultimoOrcamento: parseFloat(ultimoOrcamento),
        fornecedor1: fornecedor1,
        precoFornecedor1: parseFloat(precoFornecedor1),
        fornecedor2: fornecedor2,
        precoFornecedor2: parseFloat(precoFornecedor2),
        fornecedor3: fornecedor3,
        precoFornecedor3: parseFloat(precoFornecedor3)
    }).then(() => {
        alert('Produto adicionado com sucesso!');
        addProductForm.reset();
        carregarProdutos();
    }).catch((error) => {
        console.error('Erro ao adicionar produto: ', error);
    });
});

// Carregar produtos
function carregarProdutos() {
    db.collection('produtos').get().then((snapshot) => {
        inventoryTable.innerHTML = '';
        snapshot.forEach((doc) => {
            const produto = doc.data();
            const row = `
                <tr>
                    <td>${produto.pn}</td>
                    <td>${produto.descricao}</td>
                    <td>${produto.quantidade}</td>
                    <td>${produto.unidade}</td>
                    <td>R$ ${produto.ultimoOrcamento.toFixed(2)}</td>
                    <td>${produto.fornecedor1}</td>
                    <td>R$ ${produto.precoFornecedor1.toFixed(2)}</td>
                    <td>${produto.fornecedor2}</td>
                    <td>R$ ${produto.precoFornecedor2.toFixed(2)}</td>
                    <td>${produto.fornecedor3}</td>
                    <td>R$ ${produto.precoFornecedor3.toFixed(2)}</td>
                    <td><button onclick="deletarProduto('${doc.id}')">Excluir</button></td>
                </tr>
            `;
            inventoryTable.innerHTML += row;
        });
    });
}

// Excluir produto
function deletarProduto(id) {
    db.collection('produtos').doc(id).delete().then(() => {
        alert('Produto excluído!');
        carregarProdutos();
    }).catch((error) => {
        console.error('Erro ao excluir produto: ', error);
    });
}

// Carregar produtos na inicialização
window.onload = carregarProdutos;
