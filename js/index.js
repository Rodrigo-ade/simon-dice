const $JUGAR = document.querySelector("#jugar");
const $COLORES  = document.querySelectorAll(".color");
let patronMaquina = [];
let patronJugador = [];
$JUGAR.onclick = comenzarJuego;
let nivel = 0;

function comenzarJuego(){
    iniciarContador();
    $JUGAR.classList.add("oculto");
    manejarRonda();
}

function manejarRonda(){
    setTimeout(function(){
        manejarTurnoMaquina();
    },1000);
}

function manejarTurnoMaquina(){
    nivel ++;
    document.querySelector("#nivel").textContent = nivel;
    desactivarElegirColores();
    indicarTurnoMaquina();
    patronMaquina.push(elegirColorRandom());
    let delayTurnojugador = patronMaquina.length * 1000 + 500;
    
    pintarColores(patronMaquina);

    setTimeout(function(){
        hacerTurnoUsuario();
    },delayTurnojugador);

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
        $color.onclick = "";
    })
}

function manejarElegirColor($color){
    $color = $color.target;
    pintarColores([$color]);
    patronJugador.push($color);
    let perdiste = false;

    if(patronJugador[patronJugador.length-1] !== patronMaquina[patronJugador.length-1]){
        perdiste = true;
        reiniciarValores();
    }
    
    if(patronJugador.length === patronMaquina.length && !perdiste){
        patronJugador = [];
        manejarRonda();
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

function pintarColores($colores){
    let delay = 100;

    $colores.forEach(function($color){
        setTimeout(function(){
            $color.style.opacity = 1;
        }, delay);

        delay += 500;

        setTimeout(function(){
            $color.style.opacity = 0.5;
        }, delay);
        delay += 500;
    })
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
