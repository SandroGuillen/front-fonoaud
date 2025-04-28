let clickAudio = new Audio('./mp3/click.mp3');
let correctoAudio = new Audio('./mp3/correct.mp3');
let perderAudio = new Audio('./mp3/perder.mp3');
let ganarAudio = new Audio('./mp3/ganar.mp3');
let incorrectoAudio = new Audio('./mp3/incorrecto.mp3');

//cargo en un arreglo las imganes de las banderas. Este sera el orden que se mostrarán
let banderas =["CANGREJO.png", "CERDO.png", "ELEFANTE.png", "GALLINA.png", "GATO.png", "LEÓN.png", 
"LORO.png","PESCADO.png", "RANA.png", "RATÓN.png", "TORTUGA.png", "VACA.png"];


//arreglo que guardara la opcion correcta
let correcta = [0,1,2,2,1,0,1,0,2,0,2,1];

//arreglo que guardara los paises a mostrar en cada jugada
let opciones = [];
//cargo en el arreglo opciones las opciones a mostrar en cada jugada
opciones.push(["CANGREJO", "CERDO", "VACA"]);
opciones.push(["ELEFANTE", "CERDO", "GALLINA"]);
opciones.push(["LEON", "GATO", "ELEFANTE"]);
opciones.push(["PEZ", "LORO", "GALLINA"]);
opciones.push(["RANA", "GATO", "CANGREJO"]);
opciones.push(["LEÓN", "RATON", "PEZ"]);
opciones.push(["LEON", "LORO", "GATO"]);
opciones.push(["PEZ", "ELEFANTE", "GALLINA"]);
opciones.push(["TORTUGA", "VACA", "RANA"]);
opciones.push(["RATÓN", "CERDO", "CANGREJO"]);
opciones.push(["LORO", "RATON", "TORTUGA"]);
opciones.push(["TORTUGA", "VACA", "TORO"]);

//variable que guarda la posicion actual
let posActual = 0;
//variable que guarda la cantidad acertadas hasta el moemento
let cantidadAcertadas = 0;

function comenzarJuego(){
    //reseteamos las variables
    posActual = 0;
    cantidadAcertadas = 0;
    //activamos las pantallas necesarias
    document.getElementById("pantalla-inicial").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    cargarBandera();

}

//funcion que carga la siguiente bandera y sus opciones
function cargarBandera(){
    //controlo sis se acabaron las banderas
    if(banderas.length <= posActual){
        terminarJuego();
        
    }
    else{//cargo las opciones
        //limpiamos las clases que se asignaron
        limpiarOpciones();

        document.getElementById("imgBandera").src = "img/" + banderas[posActual];
        document.getElementById("n0").innerHTML = opciones[posActual][0];
        document.getElementById("n1").innerHTML = opciones[posActual][1];
        document.getElementById("n2").innerHTML = opciones[posActual][2];
    }
}

function limpiarOpciones(){
    document.getElementById("n0").className = "nombre";
    document.getElementById("n1").className = "nombre";
    document.getElementById("n2").className = "nombre";

    document.getElementById("l0").className = "letra";
    document.getElementById("l1").className = "letra";
    document.getElementById("l2").className = "letra";
}

function comprobarRespuesta(opElegida){
    if(opElegida==correcta[posActual]){
        correctoAudio.play();//acertó
        //agregamos las clases para colocar el color verde a la opcion elegida
        document.getElementById("n" + opElegida).className = "nombre nombreAcertada";
        document.getElementById("l" + opElegida).className = "letra letraAcertada";
        
        cantidadAcertadas++;
        
        
    }else{//no acerto
        //agramos las clases para colocar en rojo la opcion elegida
        document.getElementById("n" + opElegida).className = "nombre nombreNoAcertada";
        document.getElementById("l" + opElegida).className = "letra letraNoAcertada";
        perderAudio.play();
        //opcion que era correcta
        document.getElementById("n" + correcta[posActual]).className = "nombre nombreAcertada";
        document.getElementById("l" + correcta[posActual]).className = "letra letraAcertada";
    }
    posActual++;
    //Esperamos 1 segundo y pasamos mostrar la siguiente bandera y sus opciones
    setTimeout(cargarBandera,1000);
}

function terminarJuego(){
    //ocultamos las pantallas y mostramos la pantalla final
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
    //agreamos los resultados
    document.getElementById("numCorrectas").innerHTML = cantidadAcertadas;
    document.getElementById("numIncorrectas").innerHTML = banderas.length - cantidadAcertadas;
}

function volverAlInicio(){
    //ocultamos las pantallas y activamos la inicial
    document.getElementById("pantalla-final").style.display = "none";
    document.getElementById("pantalla-inicial").style.display = "block";
    document.getElementById("pantalla-juego").style.display = "none";
}

