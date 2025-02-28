import arrumaData from "./arrumaData.js";
import calcularIdade from "./calculaIdade.js";
const request = new XMLHttpRequest();
export default async function adicionaCliente() {
    const formulario = document.getElementById("formulario_cliente");
    const nomeCliente = document.getElementById("inp_nome").value;
    const dtnascimento = document.getElementById("inp_nascimento").value;
    const uf = document.getElementById("inp_uf").value;
    const cpf = document.getElementById("inp_cpf").value;
    const dataArrumada = arrumaData(dtnascimento);
    const idade = calcularIdade(dataArrumada);
    const dados = {
        "nome": nomeCliente,
        "idade": idade,
        "uf": uf,
        "cpf": cpf,
        "data_nascimento": dataArrumada
    };
    const url = "http://127.0.0.1:3000/clientes";
    request.open("POST", url, true);
    request.setRequestHeader("Content-type", "application/json");
    request.send(JSON.stringify(dados));
    formulario.reset();
}
