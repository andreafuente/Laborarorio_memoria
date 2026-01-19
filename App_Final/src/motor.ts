import { Carta, ResultadoJugada, Tablero } from "./model";

const barajarCartas = (cartas: Carta[]): Carta[] => {
  const cartasBarajadas = [...cartas];
  for (let i = cartasBarajadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasBarajadas[i], cartasBarajadas[j]] = [
      cartasBarajadas[j],
      cartasBarajadas[i],
    ];
  }
  return cartasBarajadas;
};

export const sePuedeVoltearLaCarta = (
  tablero: Tablero,
  indice: number
): boolean => {
  if (tablero.cartas[indice].encontrada) {
    // La carta ya ha sido encontrada
    return false;
  }

  if (tablero.cartas[indice].estaVuelta) {
    // La carta ya está volteada
    return false;
  }
  if (
    tablero.estadoPartida === "PartidaNoIniciada" ||
    tablero.estadoPartida === "DosCartasLevantadas" ||
    tablero.estadoPartida === "PartidaCompleta"
  ) {
    // Ya hay dos cartas volteadas
    return false;
  }

  if (
    tablero.estadoPartida === "CeroCartasLevantadas" ||
    tablero.estadoPartida === "UnaCartaLevantada"
  ) {
    return true;
  }

  return false;
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  if (tablero.estadoPartida === "CeroCartasLevantadas") {
    // No hay ninguna carta volteada
    tablero.cartas[indice].estaVuelta = true; // Voltear la carta
    tablero.indiceCartaVolteadaA = indice; // Guardar el índice de la carta volteada
    tablero.estadoPartida = "UnaCartaLevantada"; // Actualizar el estado de la partida
  } else if (tablero.estadoPartida === "UnaCartaLevantada") {
    // Hay una carta volteada
    tablero.cartas[indice].estaVuelta = true; // Voltear la carta
    tablero.indiceCartaVolteadaB = indice; // Guardar el índice de la carta volteada
    tablero.estadoPartida = "DosCartasLevantadas"; // Actualizar el estado de la partida
  }
};

export const sonPareja = (
  indiceA: number,
  indiceB: number,
  tablero: Tablero
): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
};

export const parejaEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
};

export const parejaNoEncontrada = (
  tablero: Tablero,
  indiceA: number,
  indiceB: number
): void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
};

export const esPartidaCompleta = (tablero: Tablero): boolean => {
  const todasEncontradas = tablero.cartas.every((carta) => carta.encontrada); // Verificar si todas las cartas han sido encontradas
  if (todasEncontradas) {
    return true;
  }
  return false;
};

export const resolverJugada = (tablero: Tablero): ResultadoJugada => {
  if (
    tablero.estadoPartida !== "DosCartasLevantadas" ||
    tablero.indiceCartaVolteadaA === undefined ||
    tablero.indiceCartaVolteadaB === undefined
  ) {
    return "NadaQueResolver";
  }

  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;

  if (sonPareja(indiceA, indiceB, tablero)) {
    return "ParejaEncontrada";
  } else {
    return "ParejaNoEncontrada";
  }
};

export const aplicarJugada = (
  tablero: Tablero,
  resultado: ResultadoJugada
): void => {
  if (resultado === "NadaQueResolver") return; // No hay nada que resolver

  const indiceA = tablero.indiceCartaVolteadaA;
  const indiceB = tablero.indiceCartaVolteadaB;
  if (indiceA === undefined || indiceB === undefined) return;

  if (resultado === "ParejaEncontrada") {
    parejaEncontrada(tablero, indiceA, indiceB); // Marcar las cartas como encontradas
  } else {
    parejaNoEncontrada(tablero, indiceA, indiceB); // Voltear las cartas de nuevo
  }

  tablero.estadoPartida = esPartidaCompleta(tablero) // Verificar si la partida está completa
    ? "PartidaCompleta"
    : "CeroCartasLevantadas";
};

export const iniciaPartida = (tablero: Tablero): void => {
  tablero.cartas.forEach((carta) => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });

  tablero.cartas = barajarCartas(tablero.cartas);
  tablero.estadoPartida = "CeroCartasLevantadas";
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};
