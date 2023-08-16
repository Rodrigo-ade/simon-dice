function comenzarJuego(){
    iniciarContador();
    $JUGAR.classList.add("oculto");
    manejarTurnoMaquina();
}

function manejarTurnoMaquina(){
    actualizarNivel();
    indicarTurnoMaquina();
    desactivarElegirColores();
    patronMaquina.push(elegirColorRandom());
    const DELAY_TURNO_JUGADOR = (patronMaquina.length + 1) * 1000;
    let delay = 0;

    patronMaquina.forEach(function($color,indice){
        delay = (indice+1) * 1000;
        setTimeout(function(){
            pintarColor($color);
        },delay)
    });

    setTimeout(function(){
        hacerTurnoUsuario();
    },DELAY_TURNO_JUGADOR);
}

function actualizarNivel(){
    nivel ++;
    document.querySelector("#nivel").textContent = nivel;
}

function indicarTurnoMaquina(){
    modificarAlerta("alert-danger","Turno de la máquina");
}

function indicarTurnoUsuario(){
    modificarAlerta("alert-info", "Te toca");
}

function hacerTurnoUsuario(){
    activarElegirColores();
    indicarTurnoUsuario();
}

function activarElegirColores(){
    $COLORES.forEach(function($color){
        $color.onclick = manejarElegirColor;
    })
}

function desactivarElegirColores(){
    $COLORES.forEach(function($color){
        $color.onclick = function(){
        };
    })
}

function manejarElegirColor($color){
    $color = $color.target;
    pintarColor($color);
    patronJugador.push($color);
    let perdiste = false;

    if(patronJugador[patronJugador.length-1] !== patronMaquina[patronJugador.length-1]){
        perdiste = true;
        reiniciarValores();
    }
    
    if(patronJugador.length === patronMaquina.length && !perdiste){
        patronJugador = [];
        manejarTurnoMaquina();
    }
}

function reiniciarValores(){
    modificarAlerta("alert-warning",`Perdiste! presiona jugar para reintentarlo`);
    desactivarElegirColores();
    pararContadorSegundos();
    $JUGAR.classList.remove("oculto");
    nivel = 0;
    patronJugador = [];
    patronMaquina = [];
}

function pintarColor($color){
    $color.style.opacity = 1;
    setTimeout(function(){
        $color.style.opacity = 0.5;
    },500);
}

function elegirColorRandom(){
    return $COLORES[Math.floor(Math.random() * $COLORES.length)];
}

function modificarAlerta(estilo,texto){
    document.querySelector("#estado-turno").className = `alert ${estilo}`;
    document.querySelector("#turno").textContent = `${texto}`;
}

function contadorSegundos(){
    if(!pararContador){
        setTimeout(function(){
            segundos ++;
            document.querySelector("#contador").textContent = segundos;
            contadorSegundos();
        },1000)
    }else{
        return;
    }
}

function pararContadorSegundos(){
    pararContador = true;
}

function iniciarContador(){
    segundos = 0;
    pararContador = false;
    contadorSegundos();
}

const $JUGAR = document.querySelector("#jugar");
const $COLORES  = document.querySelectorAll(".color");
let patronMaquina = [];
let patronJugador = [];
let nivel = 0;
let segundos = 0;
let pararContador = false;

$JUGAR.onclick = comenzarJuego;
