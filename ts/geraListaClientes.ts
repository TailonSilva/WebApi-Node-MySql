import buscaClientes from "./buscaClientes.js"
import excluiCliente from "./excluiCliente.js"
import preencheFormParaEdit from "./preencheFormParaEdit.js"

//FUNÇÃO QUE VAI BUSCAR INFORMAÇÕES DOS CLIENTES NO BANCO DE DADOS E RETORNAR UMA LISTA DO TIPO TABELA EM HTML COM OS CLIENTES
export default async function geraListaClientes() {

  //BUSCA OS CLIENTES NO BANCO DE DADOS E COLOCA NA VARIAVEL DADOS
  const dados = await buscaClientes()

  //PEGA A TABELA DO HTML ONDE TODA A TABELA DE CLIENTE VAI SER GERADA
  //ESSE CÓDIGO PRECISA ESTAR FORA DO LOOP POIS PEGA A TABELA 1 VEZ E ENTÃO COLOCA CADA LINHA COM UM CLIENTE
  const tabela = document.getElementById("tabelaClientes")

  //CONDICIONAL QUE VAI GARANTIR QUE A TABELA FOI ENCONTRADA NO HTML
  if(tabela instanceof HTMLElement ) {

    //LOOP QUE VAI CRIAR MA LINHA PARA CADA CLIENTE
    for (let i = 0; i < dados.length; i++) {

      //CRIANDO A LINHA DA TABELA
      const linha = document.createElement("tr")

      //ADICIONANDO A LINHA NA TABELA
      tabela.appendChild(linha)

      //CRIANDO A CELULA DO CÓDIGO DO CLIENTE E DANDO A CLASS NOME codigo_cliente
      const c_cod = document.createElement("td")
      c_cod.classList.add("codigo_cliente")
      const id = dados[i].id
      c_cod.innerText = id
      linha.appendChild(c_cod)

      //CRIANDO A CELULA DO NOME DO CLIENTE
      const c_cliente = document.createElement("td")
      const cont_cliente = dados[i].nome
      c_cliente.innerText = cont_cliente
      linha.appendChild(c_cliente)

      //CRIANDO A CELULA DA DATA DE NASCIMENTO DO CLIENTE
      const c_dt_nascimento = document.createElement("td")
      const cont_dt_nascimento = dados[i].data_nascimento
      c_dt_nascimento.innerText = cont_dt_nascimento
      linha.appendChild(c_dt_nascimento)

      //CRIANDO A CELULA DA IDADE DO CLIENTE
      const c_idade = document.createElement("td")
      c_idade.innerText = dados[i].idade
      linha.appendChild(c_idade)

      //CRIANDO A CELULA DO ESTADO DO CLIENTE
      const c_uf = document.createElement("td")
      const cont_uf = dados[i].uf
      c_uf.innerText = cont_uf
      linha.appendChild(c_uf)

      //CRIANDO A CELULA DO CPF DO CLIENTE
      const c_cpf = document.createElement("td")
      const cont_cpf = dados[i].cpf
      c_cpf.innerText = cont_cpf
      linha.appendChild(c_cpf)

      const c_btns = document.createElement("td")
      c_btns.classList.add('btns')
      linha.appendChild(c_btns)


      const btn_editar = document.createElement("img")
      btn_editar.classList.add('btn_editar')
      btn_editar.src = "../assets/img/icones/ico_btn_editar.png"
      c_btns.appendChild(btn_editar)

      btn_editar.addEventListener("click", event => {
        event.preventDefault()
        preencheFormParaEdit(cont_cliente, cont_dt_nascimento, cont_uf, cont_cpf, id)
      })

      const btn_excluir = document.createElement("img")
      btn_excluir.classList.add('btn_excluir')
      btn_excluir.src = "../assets/img/icones/ico_btn_excluir.png"
      c_btns.appendChild(btn_excluir)

      btn_excluir.addEventListener("click", event => {
        event.preventDefault()
        excluiCliente(id)
      })
    }
  }
}