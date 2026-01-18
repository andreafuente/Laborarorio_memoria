const tarjetaContainer = document.getElementById("grid-container");
const crearBoton = (): HTMLButtonElement => {
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "card-button";
  return boton;
};

interface InfoCarta {
  idFoto: number;
  imagen: string;
}

const cartas: InfoCarta[] = [
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
  {
    idFoto: 3,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/3.png",
  },
  {
    idFoto: 4,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/4.png",
  },
  {
    idFoto: 5,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/5.png",
  },
  {
    idFoto: 6,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/6.png",
  },
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
  {
    idFoto: 3,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/3.png",
  },
  {
    idFoto: 4,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/4.png",
  },
  {
    idFoto: 5,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/5.png",
  },
  {
    idFoto: 6,
    imagen:
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/6.png",
  },
];

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

function crearImagen(imagen: InfoCarta): HTMLImageElement {
  const imagenElement = document.createElement("img");
  imagenElement.className = "card-image";
  imagenElement.src = imagen.imagen;
  imagenElement.dataset.idFoto = imagen.idFoto.toString();
  return imagenElement;
}

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

const pintarTarjeta = (boton: HTMLButtonElement, imagen: InfoCarta): void => {
  if (!comprobarImagen(boton)) {
    pintarImagen(boton, imagen);
  } else {
   
  }
};

const botones = pintarBotones(cartas.length);

const handleCartaClick = (): void => {
  botones.forEach((boton) =>
    boton.addEventListener("click", () => {
      const indiceString = boton.dataset.indice;
            if (!indiceString) return;
      const indice = Number(indiceString);
      if (Number.isNaN(indice)) return;
      pintarTarjeta(boton, cartas[indice]);
    })
  );
};

handleCartaClick();
