import buscaClientes from "./buscaClientes.js";
import excluiCliente from "./excluiCliente.js";
import preencheFormParaEdit from "./preencheFormParaEdit.js";
export default async function geraListaClientes() {
    const dados = await buscaClientes();
    const tabela = document.getElementById("tabelaClientes");
    if (tabela instanceof HTMLElement) {
        for (let i = 0; i < dados.length; i++) {
            const linha = document.createElement("tr");
            tabela.appendChild(linha);
            const c_cod = document.createElement("td");
            c_cod.classList.add("codigo_cliente");
            const id = dados[i].id;
            c_cod.innerText = id;
            linha.appendChild(c_cod);
            const c_cliente = document.createElement("td");
            const cont_cliente = dados[i].nome;
            c_cliente.innerText = cont_cliente;
            linha.appendChild(c_cliente);
            const c_dt_nascimento = document.createElement("td");
            const cont_dt_nascimento = dados[i].data_nascimento;
            c_dt_nascimento.innerText = cont_dt_nascimento;
            linha.appendChild(c_dt_nascimento);
            const c_idade = document.createElement("td");
            c_idade.innerText = dados[i].idade;
            linha.appendChild(c_idade);
            const c_uf = document.createElement("td");
            const cont_uf = dados[i].uf;
            c_uf.innerText = cont_uf;
            linha.appendChild(c_uf);
            const c_cpf = document.createElement("td");
            const cont_cpf = dados[i].cpf;
            c_cpf.innerText = cont_cpf;
            linha.appendChild(c_cpf);
            const c_btns = document.createElement("td");
            c_btns.classList.add('btns');
            linha.appendChild(c_btns);
            const btn_editar = document.createElement("img");
            btn_editar.classList.add('btn_editar');
            btn_editar.src = "../assets/img/icones/ico_btn_editar.png";
            c_btns.appendChild(btn_editar);
            btn_editar.addEventListener("click", event => {
                event.preventDefault();
                preencheFormParaEdit(cont_cliente, cont_dt_nascimento, cont_uf, cont_cpf, id);
            });
            const btn_excluir = document.createElement("img");
            btn_excluir.classList.add('btn_excluir');
            btn_excluir.src = "../assets/img/icones/ico_btn_excluir.png";
            c_btns.appendChild(btn_excluir);
            btn_excluir.addEventListener("click", event => {
                event.preventDefault();
                excluiCliente(id);
            });
        }
    }
}
