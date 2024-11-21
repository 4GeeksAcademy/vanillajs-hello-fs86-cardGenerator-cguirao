/* eslint-disable */
import "bootstrap";
import "./style.css";

import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";

window.onload = function() {
  const cartas = _generarCartas();
  _mostrarCartas(cartas);
};

function newGame() {
  const cartas = _generarCartas();
  _mostrarJuego(cartas);

  _repartirCartas(cartas);
  // do{
  //   lanzarCarta();
  //   recogerCartasGanadas();
  //   tomarCarta();
  // }while(!finalizarJuego());
  // contarPuntos();
  // mostrarGanador();
}

function _generarCartas() {
  const palos = ["oros", "copas", "espadas", "bastos"];
  const valores = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12];

  const cartas = [];

  palos.forEach(palo => {
    valores.forEach(valor => {
      let imagen;

      if (valor == 10) {
        imagen = `src/img/sota${palo.charAt(0).toUpperCase() +
          palo.slice(1)}.jpg`;
      } else if (valor == 11) {
        imagen = `src/img/caballo${palo.charAt(0).toUpperCase() +
          palo.slice(1)}.jpg`;
      } else if (valor == 12) {
        imagen = `src/img/rey${palo.charAt(0).toUpperCase() +
          palo.slice(1)}.jpg`;
      } else {
        imagen = `src/img/${valor}${palo.charAt(0).toUpperCase() +
          palo.slice(1)}.jpg`;
      }

      cartas.push({ valor, palo, imagen });
    });
  });

  return cartas;
}

function _mostrarCartas(cartas) {
  const container = document.getElementById("cartas");
  container.innerHTML = "";

  const palos = ["oros", "copas", "espadas", "bastos"];
  const cartasAgrupadas = palos.map(palo => {
    return cartas.filter(carta => carta.palo === palo);
  });

  cartasAgrupadas.forEach((cartasPalo, index) => {
    const columna = document.createElement("div");
    columna.classList.add("columna-palo");

    cartasPalo.forEach(carta => {
      const cartaHtml = `<div class="carta">
                          <img src="${carta.imagen}" alt="${carta.valor} de ${carta.palo}">  
                        </div>`;
      columna.innerHTML += cartaHtml;
    });

    container.appendChild(columna);
  });
}

function _mostrarJuego(cartas) {
  //TODO:
  // Debe mostrar un HTML donde la maquina tiene tres cartas y tu tienes otras tres.
  //Las imagen de la maquina debe ser el revés de la carta.
}

function _repartirCartas() {
  //TODO:
}
