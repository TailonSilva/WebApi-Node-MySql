//FUNÇÃO QUE VAI BUSCAR TODOS OS CLIENTES NO BANCO DE DADOS E RETORNAR EM FORMATO JSON

export default async function buscaClientes() {

  const info_clientes = await fetch("http://127.0.0.1:3000/clientes").then(res => res.json())

  return info_clientes
  
} 