const request = new XMLHttpRequest();

import cliente from "./interfaces/interface";

export default async function alteracliente(dados:cliente, id:number) {
  const formulario = document.getElementById("formulario_cliente") as HTMLFormElement

  const btn_enviar = document.getElementById("btnEnviar")
  const btn_enviarDados = document.getElementById("btnEnviarDados")

  const url = "http://127.0.0.1:3000/clientes/"+id;

  request.open("PATCH", url, true);
  request.setRequestHeader("Content-type", "application/json");
  request.send(JSON.stringify(dados));

  formulario.reset();

  btn_enviar.style.display = "block";
  btn_enviarDados.style.display = "none";

  window.location.reload();
}