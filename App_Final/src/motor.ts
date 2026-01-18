
import { Carta, Tablero } from "./model"


const barajarCartas = (cartas : Carta[]): Carta[] => {
const cartasBarajadas = [...cartas]; 
  for (let i = cartas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasBarajadas[i], cartasBarajadas[j]] = [cartasBarajadas[j], cartasBarajadas[i]];
  }
  return cartasBarajadas;
}

/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/
const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number, ): boolean => {
  if (tablero.cartas[indice].encontrada) { // La carta ya ha sido encontrada
    return false;
  }

  if (tablero.cartas[indice].estaVuelta) { // La carta ya está volteada
    return false;
  }
  if (tablero.estadoPartida === "DosCartasLevantadas" || tablero.estadoPartida === "PartidaCompleta") { // Ya hay dos cartas volteadas
    return false;
  }

  if (tablero.estadoPartida === "CeroCartasLevantadas" || tablero.estadoPartida === "UnaCartaLevantada") {
    return true;
  }

    return false;
}

const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    tablero.cartas[indice].estaVuelta = true;
}

/*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
  return tablero.cartas[indiceA].idFoto === tablero.cartas[indiceB].idFoto;
}

/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/
const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
  tablero.cartas[indiceA].encontrada = true;
  tablero.cartas[indiceB].encontrada = true;
}

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
  tablero.cartas[indiceA].estaVuelta = false;
  tablero.cartas[indiceB].estaVuelta = false;
}

/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/
export const esPartidaCompleta (tablero: Tablero) : boolean => {
    const todasEncontradas = tablero.cartas.every((carta) => carta.encontrada);
    if (todasEncontradas) {
        return true;
    }
    return false;
}


export const iniciaPartida = (tablero: Tablero): void => {
    tablero.cartas = barajarCartas(tablero.cartas);
    tablero.estadoPartida = "CeroCartasLevantadas";
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
};