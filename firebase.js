var frm = document.getElementById('frm_cadastro');
const url_api = "https://devup-tmp02-default-rtdb.firebaseio.com/";

let editId = null;
frm.addEventListener('submit', e => {
    e.preventDefault();

    let nome = document.querySelector('#nome');
    let telefone = document.querySelector('#telefone');
    let email = document.querySelector('#email');

    let dados = {
        'nome': nome.value,
        'telefone': telefone.value,
        'email': email.value,
    };

    if (id_usuario.value) {
        //atualização
        fetch (url_api + 'usuario/' + id_usuario.value + '.json', {
            method: 'PUT',
            body: JSON.stringify(dados)
        })
            .then(resposta => resposta.json())
            .then(dados => {
                frm.reset()
                listar();
            })
    } else {
        //cadastro
        fetch(url_api + 'usuario.json', {
            method: 'POST',
            body: JSON.stringify(dados)
        })
            .then(resposta => resposta.json())
            .then(dados => {
                frm.reset()
                listar();
            })
    }


    listar();
    frm.reset
    id_usuario.value = ""

    document.querySelector('button[type=submit').innerHTML = 'Cadastrar'
});

function listar() {
    let lista = document.getElementById('lista');
    fetch(url_api + 'usuario.json')
        .then(resposta => resposta.json())
        .then(dados => {
            lista.innerHTML = "";
            for (const key in dados) {
                lista.innerHTML += `
            <tr>
                <td>${dados[key].nome}</td>
                <td>${dados[key].telefone}</td>
                <td>${dados[key].email}</td>
                <td>
                    <button class="btn btn-warning" onclick="editar ('${key}')"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" onclick="deletar('${key}')"><i class="bi bi-person-x-fill"></i></button>
                </td>
            </tr>
            `;
            }
        });
}

function editar(id_usuario) {
    fetch(url_api + 'usuario/' + id_usuario + '.json')
        .then(resposta => resposta.json())
        .then(dados => {
            nome.value = dados.nome
            email.value = dados.email
            telefone.value = dados.telefone
            document.getElementById('id_usuario').value = id_usuario

            document.querySelector('button[type=submit]').innerHTML = 'ALTERAR'
        })
}

function deletar(id_usuario) {
{fetch(url_api + 'usuario/' + id_usuario + '.json', {
        method: 'DELETE',
    })
        .then(resposta => resposta.json()) 
        .then(dados =>{
            listar();
        })
    }
}


listar();

setInterval(() => {
    listar();
}, 1000);

function exportar(id_tabela) {
    var nome_arquivo_exportacao = `${id_tabela}.xlsx`;
    var tabela_exportacao = document.getElementById(id_tabela);
    var planilha = XLSX.utils.table_to_book(tabela_exportacao);
    XLSX.writeFile(planilha, nome_arquivo_exportacao);
}

function gerar_pdf() {
    var element = document.querySelector('.container');
    var opt = {
        margin: 1,
        filename: 'arquivo.pdf',
        image: {type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {unit: 'in', format:'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}