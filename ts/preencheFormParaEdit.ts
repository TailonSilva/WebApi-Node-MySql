import alteracliente from "./alteraCliente.js"
import arrumaData from "./arrumaData.js"
import calcularIdade from "./calculaIdade.js"
import cliente from "./interfaces/interface.js"
import reverteData from "./reverteData.js"

export default async function preencheFormParaEdit(
  c_clinte:string,
  c_dt_nascimento:string,
  c_uf:string,
  c_cpf:string,
  id:number
) {

  const btn_enviar = document.getElementById('btnEnviar')
  const btn_editarDados = document.getElementById('btnEditarDados')

  btn_enviar.style.display = 'none'
  btn_editarDados.style.display = 'block'

  const nomeCliente = document.getElementById("inp_nome") as HTMLInputElement
  const dtnascimento = document.getElementById("inp_nascimento") as HTMLInputElement
  const uf = document.getElementById("inp_uf") as HTMLInputElement
  const cpf = document.getElementById("inp_cpf") as HTMLInputElement

  const novaData = reverteData(c_dt_nascimento)

  nomeCliente.value = c_clinte
  dtnascimento.value = novaData
  uf.value = c_uf
  cpf.value = c_cpf

  btn_editarDados.addEventListener('click', event => {

    const novoNomeCliente = (document.getElementById("inp_nome") as HTMLInputElement).value

    const novoDtnascimento = (document.getElementById("inp_nascimento") as HTMLInputElement).value     
    const novoUf = (document.getElementById("inp_uf") as HTMLInputElement).value       
    const novoCpf = (document.getElementById("inp_cpf") as HTMLInputElement) .value

    const dtNascimentoAjustada = arrumaData(novoDtnascimento)
    const idade = calcularIdade(dtNascimentoAjustada)

      const dados:cliente = {
        "nome" : novoNomeCliente,
        "idade": idade,
        "uf" : novoUf,
        "cpf" : novoCpf,
        "data_nascimento" : dtNascimentoAjustada
      }

      event.preventDefault()
      alteracliente(dados, id)

      window.location.reload()
  })
}
