function abrirMenu (){
    const lista = document.getElementById("uluser")

    if (lista.style.display === "none" || lista.style.display === "") {
        lista.style.display = "block"
    } else {
        lista.style.display = "none"
    }
}

async function buscaProfessores(){
    const url = await fetch("https://db-wy4i.onrender.com/professores")
    
    const dados = await url.json()
    
    const tabela = document.getElementById("tabelaProfessor")
    const corpoDaTabela = `
    <thead>
        <tr>
        <th>Nome</th>
        <th>Disciplina</th>
        <th>Perfil</th>
        <th><span>Ativo</span></th>
        <th><span>Ações</span></th>
        </tr>
    </thead>

    <tbody>
        ${dados.map(professor =>`
            <tr>
                <td>${professor.nome}</td>
                <td>${professor.disciplina}</td>
                <td>${professor.perfil}</td>
                <td><span>${professor.ativo ? '<span id="iconeativo"><img src="../imagens/iconeativo.png" alt=""></span>' : '<img src="../imagens/iconeinativo.png" alt="">'}</span></td>
                <td>
                    <span>
                     <img src="../imagens/iconeeditar.png" alt="" onclick="editarprofessores(${professor.id})">
                     <img src="../imagens/iconedeletar.png" alt="" onclick="deletarprofessor(${professor.id})">
                    </span>
                </td>
            </tr>
        `)}
    </tbody>
    `
    tabela.innerHTML=corpoDaTabela

}

buscaProfessores()

async function buscaAluno(){
    const url = await fetch("https://db-wy4i.onrender.com/alunos")
    
    const dados = await url.json()
    
    const tabela = document.getElementById("tabelaAluno")
    const corpoDaTabela = `
    <thead>
        <tr>
        <th>Nome</th>
        <th>Turma</th>
        <th><span>Ativo</span></th>
        <th><span>Ações</span></th>
        </tr>
    </thead>

    <tbody>
        ${dados.map(aluno =>`
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.turma}</td>
                <td><span>${aluno.ativo ? '<span id="iconeativo"><img src="../imagens/iconeativo.png" alt=""></span>' : '<img src="../imagens/iconeinativo.png" alt="">'}</span></td>
                
                <td class="botoesUsuarios">
                    <span>
                     <img src="../imagens/iconeeditar.png" alt="" onclick="editarAluno(${aluno.id})">
                     <img src="../imagens/iconedeletar.png" alt="" onclick="deletarAluno(${aluno.id})">
                    </span>
                </td>
            </tr>
        `)}
    </tbody>
    `
    tabela.innerHTML=corpoDaTabela

}

buscaAluno()

async function cadastraprofessores (){
    let nome = document.getElementById('nome').value
    let perfil = document.getElementById('perfil').value
    let disciplina = document.getElementById('disciplina').value
    let ativo = document.getElementById('ativo').checked

    let dados ={nome, perfil, disciplina, ativo}

    const resposta = await fetch("https://db-wy4i.onrender.com/professores", {
      method:"POST", 
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(dados)
    })

    if(resposta.status === 201){
        window.location.href = '../professores/index.html'
    } else {
        alert("erro ao criar professores")
    }

}

async function deletarprofessor(id){
    const resposta = await fetch(`https://db-wy4i.onrender.com/professores/${id}` , {
        method:'DELETE'
    })


    if(resposta.status === 200){
        window.location.reload()
    } else {
        alert("erro ao deletar professores")
    }
    
}
function editarprofessores(id){
    window.location.href = `../editarProfessor/index.html?id=${id}`
}
async function editarprofessor (){
    let nome = document.getElementById('nomeAt').value
    let perfil = document.getElementById('perfilAt').value
    let disciplina = document.getElementById('disciplinaAt').value
    let ativo = document.getElementById('ativoAt').checked

    let dados ={nome, perfil, disciplina, ativo}
    const parametro = new URLSearchParams(window.location.search);
    const id = parametro.get('id');
    const resposta = await fetch(`https://db-wy4i.onrender.com/professores/${id}`, {
      method:"PUT",
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(dados)
    })

    if(resposta.status === 200){
        window.location.href = '../professores/index.html'
    } else {
        alert("erro ao criar professores")
    }

}

async function buscaProfessorPorNome () {
    let busca = document.getElementById('inputbusca').value

    const dadosBusca = await fetch(`https://db-wy4i.onrender.com/professores?nome_like=${busca}`)

    if(dadosBusca.status === 200){
        const dadosFormatado = await dadosBusca.json()
        exibirResultado(dadosFormatado)
    } else {
        alert("erro ao busca professor")
    }
}

document.addEventListener("keypress", function(e){
    
    if(e.key === "Enter"){
        
        const btn = document.querySelector(".imagemAdd")

        btn.click()

    }
})

function exibirResultado (dados){
    const tabela = document.getElementById("tabelaProfessor")
    const corpoDaTabela = `
    <thead>
        <tr>
        <th>Nome</th>
        <th>Disciplina</th>
        <th>Perfil</th>
        <th><span>Ativo</span></th>
        <th><span>Ações</span></th>
        </tr>
    </thead>

    <tbody>
        ${dados.map(professor =>`
            <tr>
                <td>${professor.nome}</td>
                <td>${professor.disciplina}</td>
                <td>${professor.perfil}</td>
                <td><span>${professor.ativo ? '<span id="iconeativo"><img src="../imagens/iconeativo.png" alt=""></span>' : '<img src="../imagens/iconeinativo.png" alt="">'}</span></td>
                <td>
                    <span>
                     <img src="../imagens/iconeeditar.png" alt="" onclick="editarprofessores(${professor.id})">
                     <img src="../imagens/iconedeletar.png" alt="" onclick="deletarprofessor(${professor.id})">
                    </span>
                </td>
            </tr>
        `)}
    </tbody>
    `
    tabela.innerHTML=corpoDaTabela
}

async function cadastraAluno (){
    let nome = document.getElementById('nome').value
    let turma = document.getElementById('turma').value
    let ativo = document.getElementById('ativo').checked

    let dados ={nome, turma,ativo}

    const resposta = await fetch("https://db-wy4i.onrender.com/alunos", {
      method:"POST", 
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(dados)
    })

    if(resposta.status === 201){
        window.location.href = '../aluno/index.html'
    } else {
        alert("erro ao criar aluno")
    }

}

function editarAluno(id){
    window.location.href = `../editarAluno/index.html?id=${id}`
}
async function editarAlunos (){
    let nome = document.getElementById('nomeAt').value
    let turma= document.getElementById('turmaAt').value
    let ativo = document.getElementById('ativoAt').checked

    let dados ={nome, turma, ativo}
    const parametro = new URLSearchParams(window.location.search);
    const id = parametro.get('id');
    const resposta = await fetch(`https://db-wy4i.onrender.com/alunos/${id}`, {
      method:"PUT",
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(dados)
    })

    if(resposta.status === 200){
        window.location.href = '../aluno/index.html'
    } else {
        alert("erro ao editar aluno")
    }

}

async function deletarAluno(id){
    const resposta = await fetch(`https://db-wy4i.onrender.com/alunos/${id}` , {
        method:'DELETE'
    })


    if(resposta.status === 200){
        window.location.reload()
    } else {
        alert("erro ao deletar aluno")
    }
    
}

async function buscaAlunoPorNome () {
    let busca = document.getElementById('inputAluno').value

    const dadosBusca = await fetch(`https://db-wy4i.onrender.com/alunos?nome_like=${busca}`)

    if(dadosBusca.status === 200){
        const dadosFormatado = await dadosBusca.json()
        exibirResultadoAluno(dadosFormatado)
    } else {
        alert("erro ao busca aluno")
    }
}

document.addEventListener("keypress", function(e){
    
    if(e.key === "Enter"){
        
        const btn = document.querySelector(".imagemAdd")

        btn.click()

    }
})

function exibirResultadoAluno(dados){
    const tabela = document.getElementById("tabelaAluno")
    const corpoDaTabela = `
    <thead>
        <tr>
        <th>Nome</th>
        <th>Turma</th>
        <th><span>Ativo</span></th>
        <th><span>Ações</span></th>
        </tr>
    </thead>

    <tbody>
        ${dados.map(aluno =>`
            <tr>
                <td>${aluno.nome}</td>
                <td>${aluno.turma}</td>
                <td><span>${aluno.ativo ? '<span id="iconeativo"><img src="../imagens/iconeativo.png" alt=""></span>' : '<img src="../imagens/iconeinativo.png" alt="">'}</span></td>
                
                <td class="botoesUsuarios">
                    <span>
                     <img src="../imagens/iconeeditar.png" alt="" onclick="editarAluno(${aluno.id})">
                     <img src="../imagens/iconedeletar.png" alt="" onclick="deletarAluno(${aluno.id})">
                    </span>
                </td>
            </tr>
        `)}
    </tbody>
    `
    tabela.innerHTML=corpoDaTabela
}