//PEGANDO A DATA ENVIADO PELO FORMULÁRIO E COLOCANDO ELA NO MODELO DIA/MES/ANO
export default function reverteData (data) {
  const dataRevertida = data.split("/").reverse().join("-")
  return dataRevertida
}
