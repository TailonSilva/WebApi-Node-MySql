export default function reverteData(data) {
    const dataRevertida = data.split("/").reverse().join("-");
    return dataRevertida;
}
