export default function arrumaData(dataFormulario) {
    const dataNova = dataFormulario.split("-").reverse().join("/");
    return dataNova;
}
