const botones = document.querySelectorAll<HTMLButtonElement>(".card-button");
const boton1 = botones[0];
const boton2 = botones[1];


interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const infoCartas: InfoCarta[] = [
  {
    idFoto: 1,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png",
  },
  {
    idFoto: 2,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png",
  },
];

const crearImagen = (imagen: InfoCarta): HTMLImageElement => {
  const imagenElement = document.createElement("img");
  imagenElement.className ="card-image";
  imagenElement.src = imagen.imagen;
  return imagenElement;
};

//Comprobar si existe la imagen antes de pintarla
export const comprobarImagen = (boton: HTMLButtonElement): boolean => {
  const imagenExistente = boton.querySelector(".card-image");
  if (imagenExistente !== null) {
    return true;
  }
  return false;
};

//Limpiar imagen existente
export const limpiarImagenExistente = (boton: HTMLButtonElement): void => {
  const imagenExistente = boton.querySelector(".card-image");
  if (imagenExistente !== null) {
    imagenExistente.remove();
  }
};

const pintarImagen = (boton: HTMLButtonElement, imagen: InfoCarta): void => {
  if (!comprobarImagen(boton)) {
    const imagenTarjeta = crearImagen(imagen);

    boton.appendChild(imagenTarjeta);
  }
};



const pintarTarjeta = (boton: HTMLButtonElement, imagen: InfoCarta) : void => {
        if (!comprobarImagen(boton)) {
      pintarImagen(boton,imagen);
    } else  {
        limpiarImagenExistente(boton);
      }
};

const handleBoton1 = (): void => {
  if (boton1) {
    boton1.addEventListener("click", () => {
         pintarTarjeta(boton1,infoCartas[0]);
    });
  }
};

const handleBoton2 = (): void => {
  if (boton2 ) {
    boton2.addEventListener("click", () => {
         pintarTarjeta(boton2,infoCartas[1]);
    });
  }
};

handleBoton1();  
handleBoton2();


