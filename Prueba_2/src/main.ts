const tarjetaContainer = document.getElementById("container");
const crearBoton = (): HTMLButtonElement | HTMLDivElement => {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.id = "boton-tarjeta";

  if (
    tarjetaContainer !== null &&
    tarjetaContainer !== undefined &&
    tarjetaContainer instanceof HTMLElement
  ) {
    tarjetaContainer.appendChild(boton);
    return boton;
  } else {
    const mensajeError = "No se ha encontrado el contenedor de la tarjeta";
    const errorContainer = document.createElement("div");
    errorContainer.id = "error-container";
    errorContainer.textContent = mensajeError;
    document.body.appendChild(errorContainer);
    return errorContainer;
  }
};

const nuevoBoton = crearBoton();

//Comprobar si existe la imagen antes de pintarla
export const comprobarImagen = (boton: HTMLButtonElement): boolean => {
  const imagenExistente = boton.querySelector("#imagen-tarjeta");
  if (imagenExistente !== null) {
    return true;
  }
  return false;
};

//Limpiar imagen existente
export const limpiarImagenExistente = (boton: HTMLButtonElement): void => {
  const imagenExistente = boton.querySelector("#imagen-tarjeta");
  if (imagenExistente !== null) {
    imagenExistente.remove();
  }
};

const pintarImagen = (boton: HTMLButtonElement): void => {
  if (!comprobarImagen(boton)) {
    const imagenTarjeta = document.createElement("img");
    imagenTarjeta.id = "imagen-tarjeta";
    imagenTarjeta.src =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png";
    imagenTarjeta.alt = "";
    boton.appendChild(imagenTarjeta);
  }
};

type estadoTarjeta = "CARA" | "DORSO";

let estadoActual: estadoTarjeta = "DORSO";

const pintarTarjeta = (boton: HTMLButtonElement, estado: estadoTarjeta): void => {
        if (estado === "CARA") {
      pintarImagen(boton);
      boton.style.backgroundColor = "";
    } else if (estado === "DORSO") {
      //Borrar la imagen si existe
      if (comprobarImagen(boton)) {
        limpiarImagenExistente(boton);
      }
      boton.style.backgroundColor = "#aee2ff";
    }
  };

if (nuevoBoton instanceof HTMLButtonElement) {
  pintarTarjeta(nuevoBoton,"DORSO");
}

const handleJugar = (): void => {
  if (nuevoBoton instanceof HTMLButtonElement) {
    nuevoBoton.addEventListener("click", () => {
      estadoActual = estadoActual === "DORSO" ? "CARA" : "DORSO";
      pintarTarjeta(nuevoBoton,estadoActual);
    });
  }
};
if (nuevoBoton instanceof HTMLButtonElement) {
  pintarTarjeta(nuevoBoton,"DORSO");
}

handleJugar();
