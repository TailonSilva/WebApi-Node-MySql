import alteracliente from "./alteraCliente.js";
import arrumaData from "./arrumaData.js";
import calcularIdade from "./calculaIdade.js";
import reverteData from "./reverteData.js";
export default async function preencheFormParaEdit(c_clinte, c_dt_nascimento, c_uf, c_cpf, id) {
    const btn_enviar = document.getElementById('btnEnviar');
    const btn_editarDados = document.getElementById('btnEditarDados');
    btn_enviar.style.display = 'none';
    btn_editarDados.style.display = 'block';
    const nomeCliente = document.getElementById("inp_nome");
    const dtnascimento = document.getElementById("inp_nascimento");
    const uf = document.getElementById("inp_uf");
    const cpf = document.getElementById("inp_cpf");
    const novaData = reverteData(c_dt_nascimento);
    nomeCliente.value = c_clinte;
    dtnascimento.value = novaData;
    uf.value = c_uf;
    cpf.value = c_cpf;
    btn_editarDados.addEventListener('click', event => {
        const novoNomeCliente = document.getElementById("inp_nome").value;
        const novoDtnascimento = document.getElementById("inp_nascimento").value;
        const novoUf = document.getElementById("inp_uf").value;
        const novoCpf = document.getElementById("inp_cpf").value;
        const dtNascimentoAjustada = arrumaData(novoDtnascimento);
        const idade = calcularIdade(dtNascimentoAjustada);
        const dados = {
            "nome": novoNomeCliente,
            "idade": idade,
            "uf": novoUf,
            "cpf": novoCpf,
            "data_nascimento": dtNascimentoAjustada
        };
        event.preventDefault();
        alteracliente(dados, id);
        window.location.reload();
    });
}
