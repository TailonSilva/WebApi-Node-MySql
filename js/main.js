//PEGANDO A DATA ENVIADO PELO FORMULÁRIO E COLOCANDO ELA NO MODELO DIA/MES/ANO
const arrumaData = (dataForm) => {
  //RECEBE A DATA DO FORMULÁRIO
  //SPLIT: SEPARA AS INORMAÇÕES DE DIA MES E ANO QUE VEM JUNTAS COM IFEM
  //REVERSE: ARRUMA AS INFORMAÇÕES QUE ESTAVA ANO DIA MES PARA DIA MES ANO
  //JOIN: REFAZ A STRING COM A SEPARAÇÃO POR IFEM NOVAMENTE AGORA NO FORMATO DIA-MES-ANO
  const dataNova = dataForm.split("-").reverse().join("/")
  //RETORNA A DATA NO FORMATO CORRETO PARA O BANCO DE DADOS
  return dataNova
}

//FUNÇÃO QUE CALCULA A IDADE A PARTIR DA DATA DE NASCIMENTO INFORMADA NO FORMULÁRIO.
const calculaIdade = (dataNascimento) => {
  const dataRecebida = dataNascimento.split("/")
  
  const diaNascimento = dataRecebida[0]
  const mesNascimento = dataRecebida[1]
  const AnoNascimento = dataRecebida[2]

  const anoAtual = new Date().getFullYear()
  const mesAtual = new Date().getMonth() + 1
  const diaAtual = new Date().getDate()

  const idade = anoAtual - AnoNascimento

  
  if (mesAtual >= mesNascimento) {
    if(diaAtual >= diaNascimento) {
      return idade
    } else {
      return idade -1
    }
  } else {
    return idade - 1
  }
}

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
  let request = new XMLHttpRequest()
  request.open("POST", url, true) //SEMPRE COM FOR POST VAI SER TRUE
  request.setRequestHeader("Content-Type" , "application/json")
  request.send(JSON.stringify(dados))

  formulario.reset()
}

//const excluiCliente = async () => {}

//const editaCliente = async () => {}

const geraListaClientes = async () => {
  const tabela = document.getElementById("tabelaClientes")
  
  const dados = await buscaClientes()

  for (let i = 0 ; i < dados.length ; i++) { 

    const linha = document.createElement("tr")
    tabela.appendChild(linha)

    const c_cod = document.createElement('td')
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
  }
}

const btn_enviar = document.getElementById("btnEnviar").addEventListener("click", event => {
  event.preventDefault()
  adicionaCliente()
})

geraListaClientes()