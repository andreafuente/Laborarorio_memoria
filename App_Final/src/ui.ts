import { Carta, tablero, ResultadoJugada, Tablero } from "./model";
import {
  iniciaPartida,
  sePuedeVoltearLaCarta,
  voltearLaCarta,
  resolverJugada,
  aplicarJugada,
} from "./motor";

const tarjetaContainer = document.getElementById("grid-container");
const crearBoton = (): HTMLButtonElement => {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "card-button";
  return boton;
};

const pintarBotones = (cantidad: number): HTMLButtonElement[] => {
  const botones: HTMLButtonElement[] = [];
  for (let i = 0; i < cantidad; i++) {
    const boton = crearBoton();
    if (tarjetaContainer) {
      tarjetaContainer.appendChild(boton);
      boton.dataset.indice = i.toString();
      botones.push(boton);
    }
  }
  return botones;
};

const crearImagen = (imagen: Carta): HTMLImageElement => {
  const imagenElement = document.createElement("img");
  imagenElement.className = "card-image";
  imagenElement.src = imagen.imagen;
  imagenElement.dataset.idFoto = imagen.idFoto.toString();
  return imagenElement;
};

const obtenerCarta = (
  boton: HTMLButtonElement,
  tablero: Tablero,
): { indice: number; carta: Carta } | undefined => {
  const indiceString = boton.dataset.indice;
  if (!indiceString) return;

  const indice = Number(indiceString);
  if (Number.isNaN(indice)) return;

  const carta = tablero.cartas[indice];
  if (!carta) return;

  return { indice, carta };
};

//Limpiar imagen existente
const limpiarImagenExistente = (boton: HTMLButtonElement): void => {
  const imagenExistente = boton.querySelector<HTMLImageElement>(".card-image");
  if (imagenExistente !== null) {
    imagenExistente.remove();
  }
};

const pintarImagen = (boton: HTMLButtonElement, carta: Carta): void => {
  const imagenExistente = boton.querySelector<HTMLImageElement>(".card-image");
  const imagenTarjeta = crearImagen(carta);

  if (imagenExistente) {
    imagenExistente.src = carta.imagen;
    imagenExistente.dataset.idFoto = String(carta.idFoto);
    return;
  }

  boton.appendChild(imagenTarjeta);
};

export const pintarTarjeta = (boton: HTMLButtonElement, carta: Carta): void => {
  if (carta.estaVuelta || carta.encontrada) {
    pintarImagen(boton, carta);
  } else {
    limpiarImagenExistente(boton);
  }
};

const botones = pintarBotones(tablero.cartas.length);

const mensajeElemento = document.getElementById("mensaje");
export const mostrarMensaje = (mensaje: string): void => {
  if (mensajeElemento) {
    mensajeElemento.textContent = mensaje;
  }
};

const mensajePartidaCompleta = "¡Felicidades! Has completado la partida"

const pintarMensajeFinal = (): void => {
  if (tablero.estadoPartida === "PartidaCompleta") {
    mostrarMensaje(mensajePartidaCompleta);
  } else {
    mostrarMensaje("");
  }
};

const pintarTablero = (): void => {
  botones.forEach((boton) => {
    const info = obtenerCarta(boton, tablero);
    if (!info) return;
    const { indice, carta } = info;
    pintarTarjeta(boton, carta);

    boton.disabled = !sePuedeVoltearLaCarta(tablero, indice);
  });
};

const contadorIntentos = document.getElementById("contador");
export const actualizarContador = (intentos: number): void => {
  if (contadorIntentos) {
    contadorIntentos.textContent = `Intentos: ${intentos}`;
  }
};

const mostrarJugada = (resultado: ResultadoJugada): void => {
  aplicarJugada(tablero, resultado);
  actualizarContador(tablero.intentos);
  pintarTablero();
  pintarMensajeFinal();
};

const intentaResolver = (): void => {
  if (tablero.estadoPartida !== "DosCartasLevantadas") return;

  const resultado = resolverJugada(tablero);
  if (resultado === "NadaQueResolver") return;

  if (resultado === "ParejaNoEncontrada") {
    setTimeout(() => mostrarJugada(resultado), 1000);
    return;
  }

  mostrarJugada(resultado);
};

const animarClick = (boton: HTMLButtonElement): void => {
  boton.classList.add("animar");
  setTimeout(() => {
    boton.classList.remove("animar");
  }, 800);
};

const alHacerClick = (boton: HTMLButtonElement): void => {
  const informacion = obtenerCarta(boton, tablero);
  if (!informacion) return;

  const indice = informacion.indice;

  if (!sePuedeVoltearLaCarta(tablero, indice)) return;
  animarClick(boton);
  voltearLaCarta(tablero, indice);
  pintarTablero();
  intentaResolver();
};

const handleCartaClick = (): void => {
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      alHacerClick(boton);
      pintarMensajeFinal();
    });
  });
};

const botonIniciar = document.getElementById("start-button");

const handleIniciaPartida = (): void => {
  if (!(botonIniciar instanceof HTMLButtonElement)) return;

  botonIniciar.addEventListener("click", () => {
    iniciaPartida(tablero);
    actualizarContador(tablero.intentos);
    pintarTablero();
    pintarMensajeFinal();
  });
};

let pantallaCargada = false;

export const cargarPantalla = (): void => {
  if (pantallaCargada) return;
  pantallaCargada = true;
  handleIniciaPartida();
  handleCartaClick();
  pintarTablero();
  pintarMensajeFinal();
}; 
