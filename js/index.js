const $JUGAR = document.querySelector("#jugar");
const $COLORES  = document.querySelectorAll(".color");
let patronMaquina = [];
let patronJugador = [];
$JUGAR.onclick = comenzarJuego;
let nivel = 0;

function comenzarJuego(){
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


}
function indicarTurnoMaquina(){
    modificarAlerta("alert-danger","Turno de la máquina");
}
function desactivarElegirColores(){
    $COLORES.forEach(function($color){
        $color.onclick = "";
    })
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
