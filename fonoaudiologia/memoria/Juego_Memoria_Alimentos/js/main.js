//Inicializacion de variables
let tarjetasDestapadas =0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado=null;
let SegundoResultado=null;
let Movimientos=0;
let Aciertos=0;
let Tiempo=false;
let timer =60;
let TiempoInicial =timer;
let TiempoRegrecivoId = null;

let clickAudio = new Audio('./mp3/click.mp3');
let correctoAudio = new Audio('./mp3/correcto.mp3');
let perderAudio = new Audio('./mp3/perder.mp3');
let ganarAudio = new Audio('./mp3/ganar.mp3');
let incorrectoAudio = new Audio('./mp3/incorrecto.mp3');


//Apuntado a documento HTML
let mostrarMovimientos = document.getElementById('Movimientos');
let mostrarAciertos = document.getElementById('Aciertos');
let mostrarTiempo = document.getElementById('Tiempo');



//Generacion de numeros Aleatorios
let numeros =[1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros =numeros.sort(()=> {return Math.random()-0.5})
console.log(numeros);

//Funciones
function contarTiempo(){
    TiempoRegrecivoId= setInterval(()=>{
 timer--;
 mostrarTiempo.innerHTML = `Tiempo:${timer} segundos`;
 if(timer==0){
  clearInterval(TiempoRegrecivoId);
  bloquearTjetas();
  perderAudio.play();
 }
    },1000);
} numeros[i]

function bloquearTjetas(){
    for(let i=0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = `<img src="./img/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled = true;
    }
    }


//funcion principal
function destapar(id){
if(Tiempo==false){
    contarTiempo();
    Tiempo = true;
}

tarjetasDestapadas++;
console.log(tarjetasDestapadas);

if(tarjetasDestapadas==1){
    //mostrar primer numero
tarjeta1=document.getElementById(id);
primerResultado = numeros[id];
tarjeta1.innerHTML = `<img src="./img/${primerResultado}.png" alt="">`;
clickAudio.play();

//Deshabilitar primer boton
tarjeta1.disabled = true;
}else if(tarjetasDestapadas==2){
    //mostrar Segundo numero
    tarjeta2 = document.getElementById(id);
    SegundoResultado = numeros[id];
    tarjeta2.innerHTML = `<img src="./img/${SegundoResultado}.png" alt="">`;

    //Deshabilitar segundo boton
    tarjeta2.disabled = true;

    //Incrementar movimiento
    Movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos:${Movimientos}`;

    if(primerResultado==SegundoResultado){
        //Encerar contador tarjetas destapadas
        tarjetasDestapadas=0;
        correctoAudio.play();
        //Aumentar aciertos
     Aciertos++;
     mostrarAciertos.innerHTML = `Aciertos:${Aciertos}`;

     if(Aciertos==8){
        ganarAudio.play();
        clearInterval(TiempoRegrecivoId);
        mostrarAciertos.innerHTML =`Aciertos:${Aciertos}🤗`;
        mostrarTiempo.innerHTML =`Demoraste ${TiempoInicial - timer} segundos 😋`;
        mostrarMovimientos.innerHTML=`Movimientos:${Movimientos}😎`;
     }
    }else{
        incorrectoAudio.play();
       //Mostrar momentaniamente valores y valoes a tapar
       setTimeout(()=>{
        tarjeta1.innerHTML= ``;
        tarjeta2.innerHTML= ``;
        tarjeta1.disabled=false;
        tarjeta2.disabled=false;
        tarjetasDestapadas = 0;
       },700)
    }
}
}