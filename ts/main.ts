import geraListaClientes from "./geraListaClientes.js"
geraListaClientes()

import adicionaCliente from "./adicionaCliente.js"

const btn_enviar = document.getElementById("btnEnviar")

btn_enviar.addEventListener("click", event => {
  event.preventDefault()
  adicionaCliente()
})

