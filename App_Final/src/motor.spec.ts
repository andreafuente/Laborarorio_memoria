import {Tablero } from './model';
import {sePuedeVoltearLaCarta, sonPareja, resolverJugada, aplicarJugada } from './motor';

describe("sePuedeVoltearLaCarta", () => {
  it("sePuedeVoltearLaCarta no permite voltear una carta que ya está vuelta", () => {
    // Given
    const tablero: Tablero = {
      cartas: [
        { idFoto: 1, imagen: "", estaVuelta: true, encontrada: false },
        { idFoto: 2, imagen: "", estaVuelta: false, encontrada: false },
      ],
      estadoPartida: "CeroCartasLevantadas",
      intentos: 0,
    };
    // When
    const resultado = sePuedeVoltearLaCarta(tablero, 0);

    // Then
    expect(resultado).toBe(false);

  });
});
describe("SonPareja", () => {
it("SonPareja devuelve true cuando las cartas tienen el mismo idFoto", () => {
// Given
const tablero: Tablero = {
  cartas: [
    { idFoto: 1, imagen: "", estaVuelta: true, encontrada: false },
    { idFoto: 1, imagen: "", estaVuelta: true, encontrada: false },
  ],
  estadoPartida: "DosCartasLevantadas",
  indiceCartaVolteadaA: 0,
  indiceCartaVolteadaB: 1,
  intentos: 0,
};
// When
const resultado = sonPareja( 0, 1, tablero);
// Then
expect(resultado).toBe(true);
});

it("SonPareja devuelve false cuando las cartas tienen diferente idFoto", () => {
// Given
const tablero: Tablero = {
  cartas: [
    { idFoto: 1, imagen: "", estaVuelta: true, encontrada: false },
    { idFoto: 2, imagen: "", estaVuelta: true, encontrada: false },
  ],
  estadoPartida: "DosCartasLevantadas",
  indiceCartaVolteadaA: 0,
  indiceCartaVolteadaB: 1,
  intentos: 0,
};
// When
const resultado = sonPareja(0, 1, tablero);
// Then
expect(resultado).toBe(false);      
}); 
});

describe("resolverJugada", () => {
  it("resolverJugada devuelve 'ParejaEncontrada' cuando las cartas son pareja", () => {
    // Given
    const tablero: Tablero = {
      cartas: [
        { idFoto: 1, imagen: "", estaVuelta: true, encontrada: false },
        { idFoto: 1, imagen: "", estaVuelta: true, encontrada: false },
      ],
      estadoPartida: "DosCartasLevantadas",
      indiceCartaVolteadaA: 0,
      indiceCartaVolteadaB: 1,
      intentos: 0,
    };
    // When
    const resultado = resolverJugada(tablero);
    // Then
    expect(resultado).toBe("ParejaEncontrada");
  });

  it("resolverJugada devuelve 'ParejaNoEncontrada' cuando las cartas no son pareja", () => {
    // Given
    const tablero: Tablero = {
      cartas: [
        { idFoto: 1, imagen: "", estaVuelta: true, encontrada: false },
        { idFoto: 2, imagen: "", estaVuelta: true, encontrada: false },
      ],
      estadoPartida: "DosCartasLevantadas", 
      indiceCartaVolteadaA: 0,
      indiceCartaVolteadaB: 1,
      intentos: 0,
    };
    // When
    const resultado = resolverJugada(tablero);
    // Then
    expect(resultado).toBe("ParejaNoEncontrada");
  });
});

describe("aplicarJugada", () => {
  it("aplicarJugada marca las cartas como encontradas cuando el resultado es 'ParejaEncontrada'", () => {
    // Given
    const tablero: Tablero = {
      cartas: [
        { idFoto: 1, imagen: "", estaVuelta: true, encontrada: false },
        { idFoto: 1, imagen: "", estaVuelta: true, encontrada: false },
      ],
      estadoPartida: "DosCartasLevantadas",
      indiceCartaVolteadaA: 0,
      indiceCartaVolteadaB: 1,
      intentos: 0,
    };
    // When
    aplicarJugada(tablero, "ParejaEncontrada");
    // Then
    expect(tablero.cartas[0].encontrada).toBe(true);
    expect(tablero.cartas[1].encontrada).toBe(true);
  });

  it("aplicarJugada voltea las cartas hacia abajo cuando el resultado es 'ParejaNoEncontrada'", () => {
    // Given
    const tablero: Tablero = {
      cartas: [
        { idFoto: 1, imagen: "", estaVuelta: true, encontrada: false },
        { idFoto: 2, imagen: "", estaVuelta: true, encontrada: false },
      ],
      estadoPartida: "DosCartasLevantadas",
      indiceCartaVolteadaA: 0,
      indiceCartaVolteadaB: 1,
      intentos: 0,
    };
    // When
    aplicarJugada(tablero, "ParejaNoEncontrada");
    // Then
    expect(tablero.cartas[0].estaVuelta).toBe(false);
    expect(tablero.cartas[1].estaVuelta).toBe(false);
  });
});

