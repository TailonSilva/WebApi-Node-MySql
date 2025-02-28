const request = new XMLHttpRequest();
export default async function alteracliente(dados, id) {
    const formulario = document.getElementById("formulario_cliente");
    const btn_enviar = document.getElementById("btnEnviar");
    const btn_enviarDados = document.getElementById("btnEnviarDados");
    const url = "http://127.0.0.1:3000/clientes/" + id;
    request.open("PATCH", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(dados));
    formulario.reset();
    btn_enviar.style.display = "block";
    btn_enviarDados.style.display = "none";
    window.location.reload();
}
