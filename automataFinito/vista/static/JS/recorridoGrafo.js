class receptora{
    constructor(valor){
        this.valor=valor;
    };
    encenderLinea(){
        this.valor.style.borderTopColor="green";
    }
    encenderFlecha(){
        this.valor.style.borderTopColor="green";
        this.valor.style.borderRightColor="green";
    }
    encenderEstado(){
        this.valor.style.borderColor="green";
    }
    encenderEstadoAceptacion(){
        this.valor.style.borderColor="green";
        this.valor.style.outlineColor="green"
    }
}
class interfazComando{
    constructor(valor){
        this.valor=valor;
    }
    ejecutar(){
        
    }
}    
class comandoEncenderLinea extends interfazComando{
    constructor(valor){
        super(valor)
    }
    ejecutar(){
        let x=new receptora(this.valor);
        x.encenderLinea();  
    } 
    
}
class comandoEncenderFlecha extends interfazComando{
    constructor(valor){
        super(valor)
    }
    ejecutar(){
        let x=new receptora(this.valor);
        x.encenderFlecha();  
    } 
    
}
class comandoEncenderEstado extends interfazComando{
    constructor(valor){
        super(valor)
    }
    ejecutar(){
        let x=new receptora(this.valor);
        x.encenderEstado();  
    } 
    
}
class comandoEncenderEstadoAceptacion extends interfazComando{
    constructor(valor){
        super(valor)
    }
    ejecutar(){
        let x=new receptora(this.valor);
        x.encenderEstadoAceptacion();  
    } 
    
}
class invocadora{
    constructor(comando){
        this.comando=comando;
    }
    comandoEjecucion(){
        this.comando.ejecutar();
    }
}
function encenderGrafo(){
    if(document.getElementById("mensajeAutomata")!=null){
        let cadenaCompleta=document.getElementById("mensajeAutomata").innerText;
        let palabra=obtenerPalabraValida(cadenaCompleta);
        if(palabra!=null){
            correrComandos("q0","l14","f14","");
            if (palabra[0]=="a"){
                correrComandos("q1","l1","f1","");
                if (palabra[1]=="a"){
                    correrComandos("q3","l2","f2","");
                }
                if (palabra[2]=="a"){
                    correrComandos("q5","l3","f3","");
                }
                if (palabra[2]=="b"){
                    correrComandos("q2","l7","f7","");
                    if (palabra[3]=="a"){
                        correrComandos("q4","l9","f9","");
                    }
                    if (palabra[3]=="b"){
                        correrComandos("","l13","f13","q8");
                    }
                    if (palabra[4]=="a"){
                        correrComandos("q7","l12","f12","");
                    }
                    if (palabra[5]=="a"){
                        correrComandos("","l10","f10","q8");
                    }
                    if (palabra[5]=="b"){
                        correrComandos("","l11","f11","q8");
                    }
                    return null;
                }
                if (palabra[3]=="a"){
                    correrComandos("q6","l4","f4","");
                }
                if (palabra[3]=="b"){
                    correrComandos("","l5","f5","");
                    correrComandos("","l16","","");
                    correrComandos("","l15","","q9");
                    return null;
                }
                if (palabra[4]=="a"){
                    correrComandos("q7","l6","f6","");
                }
                if (palabra[5]=="a"){
                    correrComandos("","l10","f10","q8");
                    return null;
                }
                if (palabra[5]=="b"){
                    correrComandos("","l11","f11","q8");
                    return null;
                }
            }
            if (palabra[0]=="b"){
                correrComandos("q2","l8","f8","");
                if (palabra[1]=="a"){
                    correrComandos("q4","l9","f9","");
                }
                if (palabra[1]=="b"){
                    correrComandos("","l13","f13","q8");
                    return null;
                }
                if (palabra[2]=="a"){
                    correrComandos("q7","l12","f12","");
                }
                if (palabra[3]=="a"){
                    correrComandos("","l10","f10","q8");
                    return null;
                }
                if (palabra[3]=="b"){
                    correrComandos("","l11","f11","q8");
                    return null;
                }
            }


        }


    }
}
function correrComandos(estado,linea,flecha,aceptacion){
    let comando=null
    if(linea!=""){
        comando=new invocadora(new comandoEncenderLinea(document.getElementById(linea)));
        comando.comandoEjecucion();
    }
    if (flecha!="") {
        comando=new invocadora(new comandoEncenderFlecha(document.getElementById(flecha)));
        comando.comandoEjecucion();  
    }
    if(estado!=""){
        comando=new invocadora(new comandoEncenderEstado(document.getElementById(estado)));
        comando.comandoEjecucion(); 
    }
    if(aceptacion!=""){
        comando=new invocadora(new comandoEncenderEstadoAceptacion(document.getElementById(aceptacion)));
        comando.comandoEjecucion();
    }
}
function obtenerPalabraValida(cadenaCompleta) {
    let palabraIndiceInicial=cadenaCompleta.indexOf('"');
    let palabra=null;
    let palabrasAceptadas=new Array('a', 'abba', 'aba', 'abbabba', 'abbaba', 'ababba', 'ababa', 'abbabbabba', 'abbabbaba', 'abbababba', 'abbababa', 'ababbabba', 'ababbaba', 'abababba' ,'abababa');
    for (let i = cadenaCompleta.length; i>=0; i--) {
        if (cadenaCompleta[i]=='"') {
            palabra=cadenaCompleta.substring(palabraIndiceInicial+1,i);
            break;
        }
    }
    let aux=palabra
    for (let i=0; i<cadenaCompleta.length; i++){
        if (palabra==palabrasAceptadas[i]) {
            palabra=aux;
            break;
        }
        else{
            palabra=null
        }
    }
    return palabra;
}