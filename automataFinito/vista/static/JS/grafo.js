function mensajeVoz(){
    if(document.getElementById("mensajeAutomata")!=null){
        let textoMens=new SpeechSynthesisUtterance();
        textoMens.voice=speechSynthesis.getVoices()[5];
        textoMens.rate=1;
        textoMens.volume=1;
        textoMens.text=document.getElementById("mensajeAutomata").innerText;
        speechSynthesis.speak(textoMens);
    }
}
function historialEspacio(){
    if(document.getElementById("historial")!=null){
        let tabla=document.getElementById("historial");
        let numFilas=tabla.rows.length;
        let espacio=numFilas*5;
        let grafo=document.getElementById("grafo");
        let medida=espacio+"mm";
        grafo.style.marginBottom=medida;  
    }
}
function interfazIdioma(){
    let idiomaSel=document.getElementById("lenguaje").value;
    let palabrasAceptadas=new Array('a', 'abba', 'aba', 'abbabba', 'abbaba', 'ababba', 'ababa', 'abbabbabba', 'abbabbaba', 'abbababba', 'abbababa', 'ababbabba', 'ababbaba', 'abababba' ,'abababa');
    let cadenaCompleta=null;
    let primeraParte=null;
    let segundaParte=null;
    switch (idiomaSel) {
        case "Espaniol":
            document.getElementById("palabra").placeholder="Ingrese una palabra...";
            document.getElementById("validacion").innerText="Evaluar";
            document.getElementById("eleccionLeng").innerText="elija el idioma:";
            if(document.getElementById("mensajeAutomata")!=null){
                cadenaCompleta=document.getElementById("mensajeAutomata").innerText;
                primeraParte=obtenerPrimeraParteCad(cadenaCompleta);
                segundaParte=obtenerSegundaParteCad(cadenaCompleta);
                palabraValida=validarPalabra(cadenaCompleta,palabrasAceptadas);
                cadenaCompleta=reemplazarCadena(primeraParte,"la cadena",cadenaCompleta);
                if (palabraValida) {
                    cadenaCompleta=reemplazarCadena(segundaParte,"es aceptada por el autómata.",cadenaCompleta);
                }
                else{
                    cadenaCompleta=reemplazarCadena(segundaParte,"es rechazada por el autómata.",cadenaCompleta);
                }
                document.getElementById("mensajeAutomata").innerText=cadenaCompleta;
            }                
            document.getElementById("botonHistorial").innerText="Mostrar historial";
            if(document.getElementById("historial")!=null){
                document.getElementById("tablaPalabra").innerText="Palabra ingresada";
                document.getElementById("tablaEstado").innerText='"Estado de la palabra"';
                cambiarIdiomaEstadoHistorial("la cadena","es aceptada por el autómata.","no ha ingresado ninguna palabra","es rechazada por el autómata.");
            }
            else{
                document.getElementById("sinHistorial").innerText='"No hay palabras en el historial."';
            }
            break;
        case "English":
            document.getElementById("palabra").placeholder="Enter a word...";
            document.getElementById("validacion").innerText="evaluate";
            document.getElementById("eleccionLeng").innerText="choose language:";
            if(document.getElementById("mensajeAutomata")!=null){
                cadenaCompleta=document.getElementById("mensajeAutomata").innerText;
                primeraParte=obtenerPrimeraParteCad(cadenaCompleta);
                segundaParte=obtenerSegundaParteCad(cadenaCompleta);
                palabraValida=validarPalabra(cadenaCompleta,palabrasAceptadas);
                cadenaCompleta=reemplazarCadena(primeraParte,"The string",cadenaCompleta);
                if (palabraValida) {
                    cadenaCompleta=reemplazarCadena(segundaParte,"is accepted by the automaton.",cadenaCompleta); 
                }
                else{
                    cadenaCompleta=reemplazarCadena(segundaParte,"is rejected by the automaton.",cadenaCompleta);
                }
                document.getElementById("mensajeAutomata").innerText=cadenaCompleta;
            }                
            document.getElementById("botonHistorial").innerText="show history";
            if(document.getElementById("historial")!=null){
                document.getElementById("tablaPalabra").innerText="word entered";
                document.getElementById("tablaEstado").innerText='"word status"';
                cambiarIdiomaEstadoHistorial("The string","is accepted by the automaton.","you have not entered any words","is rejected by the automaton.");
            }
            else{
                document.getElementById("sinHistorial").innerText='"There are no words in the history."';
            }
            break;
        default:
            break;
    }
}
function obtenerPrimeraParteCad(cadenaCompleta) {
    let primeraParte=null;
    for (let i = 0; i < cadenaCompleta.length; i++){
        if (cadenaCompleta[i]=='"') {
            primeraParte=cadenaCompleta.substring(0,i-1);
            break;
        }
    }
    return primeraParte
}
function obtenerSegundaParteCad(cadenaCompleta) {
    let segundaParte=null;
    let indiceFinal=cadenaCompleta.length-1;
    for (let i = indiceFinal; i>=0; i--){
        if (cadenaCompleta[i]=='"') {
            segundaParte=cadenaCompleta.substring(i+2,cadenaCompleta.length);
            break;
        }
    }
    return segundaParte
}
function cambiarIdiomaEstadoHistorial(parteNueva1,parteNueva2,palabraNula,parteNueva2Neg) {
    let historialEstado=document.getElementsByClassName("estadoPalabra");
    let cadenaCompleta=null;
    let primeraParte=null;
    let segundaParte=null;
    let palabrasAceptadas=new Array('a', 'abba', 'aba', 'abbabba', 'abbaba', 'ababba', 'ababa', 'abbabbabba', 'abbabbaba', 'abbababba', 'abbababa', 'ababbabba', 'ababbaba', 'abababba' ,'abababa');
    for (let i=0; i<historialEstado.length; i++){
        cadenaCompleta=historialEstado[i].innerText;        
        if (cadenaCompleta.indexOf('"')==-1) {
            historialEstado[i].innerText=palabraNula;
        }
        else{
            palabraValida=validarPalabra(cadenaCompleta,palabrasAceptadas);
            primeraParte=obtenerPrimeraParteCad(cadenaCompleta);
            segundaParte=obtenerSegundaParteCad(cadenaCompleta);
            cadenaCompleta=reemplazarCadena(primeraParte,parteNueva1,cadenaCompleta);
            if (palabraValida) {
                cadenaCompleta=reemplazarCadena(segundaParte,parteNueva2,cadenaCompleta);
            }
            else{
                cadenaCompleta=reemplazarCadena(segundaParte,parteNueva2Neg,cadenaCompleta); 
            }
            historialEstado[i].innerText=cadenaCompleta; 
        }

    }
}
function validarPalabra(cadenaCompleta,palabrasAceptadas) {
    let palabraIndiceInicial=cadenaCompleta.indexOf('"');
    let valido=false;
    for (let i = cadenaCompleta.length; i>=0; i--) {
        if (cadenaCompleta[i]=='"') {
            palabra=cadenaCompleta.substring(palabraIndiceInicial+1,i);
            break;
        }
    }
    for (let i=0; i<cadenaCompleta.length; i++){
        if (palabra==palabrasAceptadas[i]) {
            valido=true;
            break;
        }
    }
    return valido;
}
function reemplazarCadena(cadenaVieja, cadenaNueva, cadenaCompleta) {
    // Reemplaza cadenaVieja por cadenaNueva en cadenaCompleta
    
    for (let i = 0; i < cadenaCompleta.length; i++) {
        if (cadenaCompleta.substring(i, i + cadenaVieja.length) == cadenaVieja) {
            cadenaCompleta= cadenaCompleta.substring(0, i) + cadenaNueva + cadenaCompleta.substring(i + cadenaVieja.length, cadenaCompleta.length);
        }
    }
    return cadenaCompleta;
    }
