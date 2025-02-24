let request = new XMLHttpRequest()

import arrumaData from './arrumaData.js'
import calculaIdade from './calculaIdade.js'


//FUNCÇÃO QUE RETORNA TODOS OS CLIENTES DA TABELA CLIENTES DO BANCO DE DADOS
const buscaClientes = async () => {
  const info_clientes = await fetch("http://127.0.0.1:3000/clientes").then(res => res.json())
  return info_clientes
}

//FUNÇÃO QUE PEGA INFORMAÇÕES DO FORMULÁRIO E ADICONA OS CLIENTE NOS BANCO DE DADOS.
const adicionaCliente = async () => {
  const formulario = document.getElementById("formulario_cliente")

  const nomeCliente = document.getElementById("inp_nome").value
  const dtnascimento = document.getElementById("inp_nascimento").value
  const uf = document.getElementById("inp_uf").value
  const cpf = document.getElementById("inp_cpf").value

  const dtNascimentoAjustada = arrumaData(dtnascimento)
  const idade = calculaIdade(dtNascimentoAjustada)

  const dados = {
    "nome" : nomeCliente,
    "idade": idade,
    "uf" : uf,
    "cpf" : cpf,
    "data_nascimento" : dtNascimentoAjustada
  }

  const url = "http://127.0.0.1:3000/clientes";

  //ESSA PARTE DO CODIGO PEGA O ENDPOINT E AS INFORMAÇÕES DO FORMULARIO E MANDA UMA REQUISIÃO HTTP PARA A API
  request.open("POST", url, true) //SEMPRE COM FOR POST VAI SER TRUE
  request.setRequestHeader("Content-Type" , "application/json")
  request.send(JSON.stringify(dados))

  formulario.reset()
}

//FUNÇÃO QUE O ID DA LINHA DO CODIGO E MANDA PARA O BANCO PARA EXCLUIR O REGISTRO
const excluiCliente = async (id) => {
  const url_delete = "http://127.0.0.1:3000/clientes/"+id;
  
  request.open("DELETE", url_delete);
  request.setRequestHeader("Content-Type" , "application/json")
  request.send();

}

//const editaCliente = async () => {}

const geraListaClientes = async () => {
  const tabela = document.getElementById("tabelaClientes")
  
  const dados = await buscaClientes()

  for (let i = 0 ; i < dados.length ; i++) { 

    const linha = document.createElement("tr")
    tabela.appendChild(linha)

    const c_cod = document.createElement('td')
    c_cod.classList.add("codigo_cliente")
    const id = dados[i].id
    c_cod.innerText = id
    linha.appendChild(c_cod)

    const c_cliente = document.createElement('td')
    c_cliente.innerText = dados[i].nome
    linha.appendChild(c_cliente)

    const c_dt_nascimento = document.createElement('td')
    c_dt_nascimento.innerText = dados[i].data_nascimento
    linha.appendChild(c_dt_nascimento)

    const c_idade = document.createElement('td')
    c_idade.innerText = dados[i].idade
    linha.appendChild(c_idade)

    const c_estado = document.createElement('td')
    c_estado.innerText = dados[i].uf
    linha.appendChild(c_estado)

    const c_cpf = document.createElement('td')
    c_cpf.innerText = dados[i].cpf
    linha.appendChild(c_cpf)

    const btn_editar = document.createElement("button")
    btn_editar.classList.add('btn_editar')
    btn_editar.innerText = "Editar"
    linha.appendChild(btn_editar)

    const btn_excluir = document.createElement("button")
    btn_excluir.classList.add('btn_excluir')
    btn_excluir.innerText = "Excluir"
    linha.appendChild(btn_excluir)  
    btn_excluir.addEventListener("click", event => {
      event.preventDefault()
      excluiCliente(id)

    })
  }
}

const btn_enviar = document.getElementById("btnEnviar").addEventListener("click", event => {
  event.preventDefault()
  adicionaCliente()
})

geraListaClientes()