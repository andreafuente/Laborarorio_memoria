import {mezclar} from "./main";

//Mismo número de elementos

describe("mezclar",() => {
    it("debe devolver un array el mismo número de elementos", () => {
        //Given
        const arrayOriginal = [1, 2, 3, 4, 5];
        //When
        const arrayMezclado = mezclar(arrayOriginal);
        //Then
        expect(arrayMezclado).toHaveLength(arrayOriginal.length);
    });
});

//No mutar el array original

describe("mezclar",() => {
    it("no debe mutar el array original", () => {
        //Given
        const arrayOriginal = [1, 2, 3, 4, 5];
        const copiaArray = [...arrayOriginal];
        //When
        mezclar(arrayOriginal);
        //Then
        expect(arrayOriginal).toEqual(copiaArray);
    });
});

//Comportamiento aleatorio

describe("mezclar",() => {
    it("debe devolver un array diferente al original", () => {
        //Given
        const arrayOriginal = [1, 2, 3, 4, 5];
        //When
        const arrayMezclado = mezclar(arrayOriginal);
        //Then
        expect(arrayMezclado).not.toBe(arrayOriginal);
    });
});