let frm = document.getElementById('frm_cadastro');
const url_api = "https://devup-tmp02-default-rtdb.firebaseio.com/"

frm.addEventListener('submit', e=>{
    e.preventDefault();

    let nome = document.querySelector('#nome')
    let telefone = document.querySelector('#telefone')
    let email = document.querySelector('#email')

    let dados = {
        'nome': nome.value,
        'telefone': telefone.value,
        'email': email.value
    }


    fetch(url_api + 'usuario.json',{
        method: 'POST',
        body: JSON.stringify(dados)
    })
})

function listar(){
    let lista = document.getElementById('lista')
    fetch(url_api+'usuario.json')
    .then(resposta => resposta.json())
    .then(dados=>{
        lista.innerHTML=""
        for (const key in dados) {
            lista.innerHTML +=
            `
            <tr>
            <td>${dados[key].nome}</td>
            <td>${dados[key].telefone}</td>
            <td>${dados[key].email}</td>
            <td> <button class="btn btn-warning">E</td></button>
            <td> <button class="btn btn-danger">D</td></button>
            </tr>`
        }
    })
}

listar();