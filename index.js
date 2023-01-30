document.querySelector("#comenzar").onclick = hacerTurno;

let coloresMaquina = [];
let coloresUsuario = [];
let numeroRonda = 1;

function hacerTurno(){
    bloquearInputUsuario();
    indicarTurnoMaquina();
    indicarNumeroRonda();
    agregarColorAleatorio();
    pintarColoresMaquina();
/*
..desbloquearInputUsuario()
indicar turno de usuario
se elige un colorUsuario
colorUsuario se agrega a coloresUsuario[]
//Comparar coloresUsuario[posicion] con coloresMaquina[posicion]
if no coinciden > error()
if coinciden > 
//if(coloresUsuarios.length === coloresMaquina.length){hacerTurno() Y AUMENTAR NUMERO DE RONDA} 
else{seguir pidiendo colores de usuarios}
}
*/
}

function bloquearInputUsuario(){
    //Completar
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
        let retrasoPorColor = (index + 1) * 1000;

        setTimeout(function(){
            $color.style.opacity = 1;
        },retrasoPorColor);

        setTimeout(function(){
            $color.style.opacity = 0.5;
        },retrasoPorColor + 500);
    });
}
