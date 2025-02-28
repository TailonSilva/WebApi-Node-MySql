import arrumaData from "./arrumaData.js"
import calcularIdade from "./calculaIdade.js"
import cliente from "./interfaces/interface.js"

const request = new XMLHttpRequest()


export default async function adicionaCliente() {

  const formulario = document.getElementById("formulario_cliente") as HTMLFormElement

  const nomeCliente:string = (document.getElementById("inp_nome") as HTMLInputElement).value
  const dtnascimento:string = (document.getElementById("inp_nascimento") as HTMLInputElement).value
  const uf:string = (document.getElementById("inp_uf") as HTMLInputElement).value
  const cpf:string = (document.getElementById("inp_cpf") as HTMLInputElement).value

  const dataArrumada = arrumaData(dtnascimento);
  const idade = calcularIdade(dataArrumada);

  
  const dados:cliente = {
    "nome" : nomeCliente,
    "idade": idade,
    "uf": uf,
    "cpf": cpf,
    "data_nascimento": dataArrumada
  }

  const url = "http://127.0.0.1:3000/clientes"

  //ESSA PARTE DO CODIGO PEGA O ENDPOINT E AS INFORMAÇÕES DO FORMULARIO E MANDA UMA REQUISIÃO HTTP PARA A API
  request.open("POST", url, true)
  request.setRequestHeader("Content-type", "application/json")
  request.send(JSON.stringify(dados))

  formulario.reset()

}

