//FUNÇÃO QUE CALCULA A IDADE A PARTIR DA DATA DE NASCIMENTO INFORMADA NO FORMULÁRIO.

export default function calcularIdade(dataNascimento:string):number {
  const datarecebida = dataNascimento.split("/")

  const diaNascimento = parseInt(datarecebida[0])
  const mesNascimento = parseInt(datarecebida[1])
  const anoNascimento = parseInt(datarecebida[2])

  const anoAtual = new Date().getFullYear()
  const mesAtual = new Date().getMonth() + 1
  const diaAtual = new Date().getDate()

  let idade = anoAtual - anoNascimento

  if (mesAtual >= mesNascimento) {
    if(diaAtual >= diaNascimento) {
      return idade 
    } else {
      return idade -1
    }
  } else {
    return idade -1
  }
}

