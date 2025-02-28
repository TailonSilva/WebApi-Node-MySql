const request = new XMLHttpRequest();
export default async function excluiCliente(id) {
    const url_delete = "http://127.0.0.1:3000/clientes/" + id;
    request.open("DELETE", url_delete);
    request.setRequestHeader("Content-Type", "applicaion/json");
    request.send();
    window.location.reload();
}
