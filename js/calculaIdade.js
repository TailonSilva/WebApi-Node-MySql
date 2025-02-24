//FUNÇÃO QUE CALCULA A IDADE A PARTIR DA DATA DE NASCIMENTO INFORMADA NO FORMULÁRIO.
export default function calculaIdade (dataNascimento) {
  const dataRecebida = dataNascimento.split("/")
  
  const diaNascimento = dataRecebida[0]
  const mesNascimento = dataRecebida[1]
  const AnoNascimento = dataRecebida[2]

  const anoAtual = new Date().getFullYear()
  const mesAtual = new Date().getMonth() + 1
  const diaAtual = new Date().getDate()

  const idade = anoAtual - AnoNascimento

  
  if (mesAtual >= mesNascimento) {
    if(diaAtual >= diaNascimento) {
      return idade
    } else {
      return idade -1
    }
  } else {
    return idade - 1
  }
}