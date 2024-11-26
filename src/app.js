/* eslint-disable */
import "bootstrap";
import "./style.css";

window.onload = function() {
  newGame();
};
function newGame() {
  let esTurnoJugador = true;
  const cartas = _generarCartas();
  _mostrarJuego(cartas);

  //TODO:
  //do{}while(!finalizarJuego());
  _iniciarTurnoJugador(() => {
    _iniciarTurnoMaquina(() => {
      console.log("Se ha lanzado ambas cartas");
      // _mostrarGanador();
      // _recogernuevaCarta();
    });
  });
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

function _mostrarJuego(cartas) {
  const cartasMezcladas = _mezclarCartas(cartas);
  const cartasJugador = cartasMezcladas.slice(0, 3);
  const cartasMaquina = cartasMezcladas.slice(3, 6);

  const tablero = _generarTablerto();
  _mostrarCartasMaquina(tablero, cartasMaquina);
  _mostrarZonaJuego(tablero);
  _mostrarCartasJugador(tablero, cartasJugador);
}

function _mezclarCartas(cartas) {
  const cartasMezcladas = [...cartas];
  for (let i = cartasMezcladas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cartasMezcladas[i], cartasMezcladas[j]] = [
      cartasMezcladas[j],
      cartasMezcladas[i]
    ];
  }
  return cartasMezcladas;
}

function _generarTablerto() {
  document.body.innerHTML = "";
  const tablero = document.createElement("div");
  tablero.classList.add("cartas");
  document.body.appendChild(tablero);
  return tablero;
}

function _mostrarCartasMaquina(tablero, cartas) {
  const maquinaDiv = document.createElement("div");
  maquinaDiv.classList.add(
    "maquina-cartas",
    "d-flex",
    "justify-content-center",
    "gap-3",
    "mb-4"
  );

  cartas.forEach(carta => {
    const cartaMaquina = document.createElement("div");
    cartaMaquina.classList.add("carta");
    cartaMaquina.innerHTML = `<img src="src/img/reves.jpg" alt="${carta.valor} de ${carta.palo}">`;
    maquinaDiv.appendChild(cartaMaquina);
  });

  tablero.appendChild(maquinaDiv);
}

function _mostrarZonaJuego(tablero) {
  const zonaJuego = document.createElement("div");
  zonaJuego.classList.add(
    "lanzar-cartas",
    "d-flex",
    "justify-content-center",
    "align-items-center",
    "gap-3",
    "my-4"
  );
  zonaJuego.id = "zona-juego";
  zonaJuego.innerHTML = `
    <div class="lanzar-zona">
      <p class="text-muted">Zona de lanzamiento</p>
    </div>
  `;

  tablero.appendChild(zonaJuego);
}

function _mostrarCartasJugador(tablero, cartas) {
  const jugadorDiv = document.createElement("div");
  jugadorDiv.classList.add(
    "jugador-cartas",
    "d-flex",
    "justify-content-center",
    "gap-3"
  );

  cartas.forEach((carta, index) => {
    const cartaJugador = document.createElement("div");
    cartaJugador.classList.add("carta");
    cartaJugador.innerHTML = `<img src="${carta.imagen}" alt="${carta.valor} de ${carta.palo}">`;
    cartaJugador.onclick = () => _lanzarCarta(cartaJugador);
    jugadorDiv.appendChild(cartaJugador);
  });

  tablero.appendChild(jugadorDiv);
}

function _lanzarCarta(carta) {
  const zonaLanzamiento = document.getElementById("zona-juego");
  const lanzarZona = zonaLanzamiento.querySelector(".lanzar-zona");
  lanzarZona.innerHTML = "";
  lanzarZona.appendChild(carta);
}

function _iniciarTurnoJugador(callback) {
  console.log("Turno del jugador");
  const cartasJugador = document.querySelectorAll(".jugador-cartas .carta");

  cartasJugador.forEach(carta => {
    carta.onclick = () => {
      _lanzarCarta(carta);
      cartasJugador.forEach(carta => (carta.onclick = null));
      callback();
    };
  });
}
function _iniciarTurnoMaquina(callback) {
  console.log("Turno de la máquina");

  setTimeout(() => {
    const cartasMaquina = document.querySelectorAll(".maquina-cartas .carta");

    if (cartasMaquina.length > 0) {
      const indiceAleatorio = Math.floor(Math.random() * cartasMaquina.length);
      const cartaSeleccionada = cartasMaquina[indiceAleatorio];
      _lanzarCarta(cartaSeleccionada);
      cartaSeleccionada.remove();
    }

    callback();
  }, 1000);
}
