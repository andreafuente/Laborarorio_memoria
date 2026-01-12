import {comprobarImagen,limpiarImagenExistente} from "./main";

describe("comprobarImagen", () => {
  it("debe devolver true si la imagen existe en el botón", () => {
    //Given
    const boton = document.createElement("button");
    const imagen = document.createElement("img");
    imagen.id = "imagen-tarjeta";
    boton.appendChild(imagen);
    //When
    const resultado = comprobarImagen(boton);
    //Then
    expect(resultado).toBe(true);
  });

  it("debe devolver false si la imagen no existe en el botón", () => {
    //Given
    const boton = document.createElement("button");
    //When
    const resultado = comprobarImagen(boton);
    //Then
    expect(resultado).toBe(false);
  });
});

describe("limpiarImagenExistente", () => {
  it("debe eliminar la imagen existente del botón", () => {
    //Given
    const boton = document.createElement("button");
    const imagen = document.createElement("img");
    imagen.id = "imagen-tarjeta";
    boton.appendChild(imagen);
    //When
    limpiarImagenExistente(boton);
    const resultado = boton.querySelector("#imagen-tarjeta");
    //Then
    expect(resultado).toBeNull();
  });
});