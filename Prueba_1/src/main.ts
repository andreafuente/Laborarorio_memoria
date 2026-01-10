const miArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

console.log("Contenido del array:", miArray);

export const mezclar = (array: number[]): number[] => {
const copiaArray = array.slice(); // Crear una copia del array original para no mutarlo
for (let i = copiaArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiaArray[i], copiaArray[j]] = [copiaArray[j], copiaArray[i]];
}
    return copiaArray;
}

console.log("Array mezclado:", mezclar(miArray));