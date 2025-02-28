//PEGANDO A DATA ENVIADO PELO FORMULÁRIO E COLOCANDO ELA NO MODELO DIA/MES/ANO
export default function arrumaData(dataFormulario:string):string {
  const dataNova = dataFormulario.split("-").reverse().join("/")
  return dataNova
}