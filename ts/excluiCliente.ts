const request = new XMLHttpRequest();

//FUNÇÃO QUE O ID DA LINHA DO CODIGO E MANDA PARA O BANCO PARA EXCLUIR O REGISTRO

export default async function excluiCliente(id:number) {

  const url_delete = "http://127.0.0.1:3000/clientes/"+id
  
  request.open("DELETE", url_delete);
  request.setRequestHeader("Content-Type", "applicaion/json")
  request.send()

  window.location.reload()
}