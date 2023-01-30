document.querySelector("#comenzar").onclick = hacerTurno;

let coloresMaquina = [];
let coloresUsuario = [];
let numeroRonda = 1;

function hacerTurno(){
    document.querySelector("#comenzar").classList.add("oculto");
    bloquearInputUsuario();
    indicarTurnoMaquina();
    indicarNumeroRonda();
    agregarColorAleatorio();
    let RETRASO_TURNO_USUARIO = pintarColoresMaquina();

    setTimeout(function(){
        indicarTurnoUsuario();
        desbloquearInputUsuario();
    },RETRASO_TURNO_USUARIO);

}

function indicarTurnoUsuario(){
    const $indicadorTurno = document.querySelector("#indicador-turno");
    $indicadorTurno.textContent = "Es tu turno";
    $indicadorTurno.classList.remove("alert-success");
    $indicadorTurno.classList.add("alert-primary");
}

function desbloquearInputUsuario(){
    let $colores = document.querySelectorAll(".color");
    $colores.forEach(function($color){
        $color.onclick = comprobarPatronUsuario;
    });
}

function comprobarPatronUsuario(evento){
    let $colorUsuario = evento.target;
    pintarColor($colorUsuario);
    coloresUsuario.push($colorUsuario);

    if(coloresUsuario[coloresUsuario.length - 1] === coloresMaquina[coloresUsuario.length - 1]){
        if(coloresUsuario.length === coloresMaquina.length){
            numeroRonda ++;
            coloresUsuario = [];
            const RETRASO_NUEVO_TURNO = 1000;
            
            setTimeout(function(){
                hacerTurno();
            },RETRASO_NUEVO_TURNO);

        }
    }
    else{
        perdiste();
    }
}

function pintarColor($color){
    $color.style.opacity = 1;
    const RETRASO_PINTADO = 750;

    setTimeout(function(){
        $color.style.opacity = 0.5;
    }, RETRASO_PINTADO);
}


function perdiste(){
    numeroRonda = 1;
    coloresMaquina = [];
    coloresUsuario = [];
    bloquearInputUsuario();
    document.querySelector("#comenzar").classList.remove("oculto");

    const $indicadorTurno = document.querySelector("#indicador-turno");
    $indicadorTurno.textContent = "¡Perdiste! Toca comenzar para volver a jugar";
    $indicadorTurno.classList.remove("alert-primary");
    $indicadorTurno.classList.add("alert-warning");
}

function bloquearInputUsuario(){
    let $colores = document.querySelectorAll(".color");
    $colores.forEach(function($color){
        $color.onclick = function(){
        };
    });
}

function indicarTurnoMaquina(){
    const $indicadorTurno = document.querySelector("#indicador-turno");
    $indicadorTurno.textContent = "Es el turno de la máquina";
    $indicadorTurno.classList.remove("alert-warning");
    $indicadorTurno.classList.add("alert-success");
}

function indicarNumeroRonda(){
    document.querySelector("#ronda").textContent = numeroRonda;
}

function agregarColorAleatorio(){
    let $colores = document.querySelectorAll(".color");
    let numeroAleatorio = Math.floor(Math.random() * $colores.length);
    let $colorElegido = $colores[numeroAleatorio];
    coloresMaquina.push($colorElegido); 
}

function pintarColoresMaquina(){
    coloresMaquina.forEach(function($color,index){
        let retrasoPorColor = (index + 1) * 1500;
        const RETRASO_EXTRA = 900;

        setTimeout(function(){
            $color.style.opacity = 1;
        },retrasoPorColor);

        setTimeout(function(){
            $color.style.opacity = 0.5;
        },retrasoPorColor + RETRASO_EXTRA);
    });

    return (coloresMaquina.length + 1) * 1500;
}
