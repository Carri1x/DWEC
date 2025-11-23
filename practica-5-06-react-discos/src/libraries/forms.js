"use strict";

import { isANumberAndInteger } from "./util.js";

const minDeLetras = 5;
const regexMinDeLetras = /[a-zA-Z]{5}/;
const añoMinimo = 1700;
const añoMax = 2025;
const regexCuatroDigitos = /^\d{4}$/;
const regexLocalizacion = /ES-[0-9]{3}[A-Z]{2}/;
const mensajeDeError = {
    nombre: `Debe ser un nombre de ${minDeLetras} o más letras.`,
    caratula: `La url de la caratula no es vália, debe empezar por https://`,
    grupoInterprete: `El nombre del grupo u interprete debe tener ${minDeLetras} o más letras.`,
    año: `No es un año válido`,
    localizacion: `El formato de localización es ES-001AA (ES-, 3 números y 2 letras mayúsculas).` 
}


export const formularioValido = (formulario, errores) => {
    //Si el formulario tiene los campos obligatiorios con valores y NO contiene errores habilitamos el botón de guardar disco.
    if(!contieneErrores(errores)){ // Si el formulario NO contiene errores.
        return formulario.nombre !== '' && formulario.grupoInterprete !== ''; // Y el formulario tiene los campos obligatorios rellenos.
    }
}

export const validarInput = (evento, errores, setErrores) => {
    if(evento.target.tagName !== 'INPUT') return; //Si no es un input volvemos a la función.
    const {name, value} = evento.target;
    let errorActual = '';

    switch(name){ //Decidimos en caso de que el nombre del input sea diferente hacemos la validación adecuada.
        case 'nombre':
            if(!nombreValido(value)){
                errorActual = mensajeDeError.nombre;
            }
            break;
        case 'caratula':
            if(!caratulaValida(value) ){
                errorActual = mensajeDeError.caratula;
            }
            break;
        case 'grupoInterprete':
            if(!grupoInterpreteValido(value)){
                errorActual = mensajeDeError.grupoInterprete;
            }
            break;
        case 'año':
            if(!añoValido(value)){
                errorActual = mensajeDeError.año;
            }
            break;
        case 'localizacion':
            if(!localizacionValida(value)){
                errorActual = mensajeDeError.localizacion;
            }
            if(existeLocalizacion(value)){
                errorActual = `La localización ${value}, ya existe en la base de datos`;
            }
            break;
    }

    if(errorActual){ //Si hay error actual procedemos a insertarlo en el estado de errores.
        setErrores({...errores, [name]: errorActual});
    } else { //Si no hay error y alomejor antes lo había procedemos a quitarlo.
        setErrores({...errores, [name]: ''});
    }

}
const nombreValido = (nombre) => {
    if(nombre === '') return false;
    return !isANumberAndInteger(nombre) && regexMinDeLetras.test(nombre); //Falso si es un numero o un nombre menor de 3 letras.
}

const grupoInterpreteValido = (grupoInterprete) => {
    if(grupoInterprete === '') return false;
    return nombreValido(grupoInterprete);
}

const caratulaValida = (url) => {
    if(url === "") return true;
    return url.startsWith('https://');
}

const añoValido = (año) => {
    if(año === "") return true;
    return año >= añoMinimo && año <= añoMax && regexCuatroDigitos.test(año);
}

const localizacionValida = (localizacion) => {
    if(localizacion === "") return true;
    return regexLocalizacion.test(localizacion);
}

const existeLocalizacion = (localizacion) => {
    const localizaciones = getAllLocalizaciones();
    if(localizaciones.find(localizacion)){
        return true;
    } else {
        return false; // Hago esto porque si no lo encuentra devuelve undefined, prefiero trabajar con booleanos.
    }
}

export const validoInputObligatorio = (input) => {
    return input.required;
}

export const contieneErrores = (errores) => {
    for (const atributo in errores) {
        if (!Object.hasOwn(errores, atributo)) continue;
        if(atributo !== 'prestado'){
            if(errores[atributo] !== '') { // Si el atributo no tiene valor (cadena vacía), tiene un error.
                return true;
            }
        }  
        
    }
    return false;
}

export const comprobarCompatibilidadLocalStorage = () =>{
    if(typeof localStorage === 'undefined') {
            avisarSobreLocalStorage();
            return; //El navegador no soporta localStorage salimos del evento.
    }
}

export const avisarSobreLocalStorage = () => {
    const contenidoOriginal = document.body.innerHTML;

    const aviso = crearMensajeDeAviso();
    document.body.innerHTML = "";
    document.body.appendChild(aviso);

    setTimeout(() => {
        document.body.innerHTML = contenidoOriginal;
    }, 3000);
};


const crearMensajeDeAviso = () => {
    const div = document.createElement('div');
    div.setAttribute('class', 'mensaje-error');
    div.textContent = 'Actualize la versión del navegador. No soporta nuestras recurrencias.';
    return div;
}



//Verdaderamente esta función solo funciona para este formulario. Habría que hacer un método que sirviera para todos los formularios.
export const crearDisco = (form) =>{
    return {
        uuid: crypto.randomUUID(),
        nombre: form.nombre,
        caratula: form.caratula,
        grupoInterprete: form.grupoInterprete,
        año: form.año,
        genero: form.genero,
        localizacion: form.localizacion,
        prestado: form.prestado
    }
}

// MÉTODO QUE CREA LA TARJETA DE CADA DISCO CON SU BOTÓN DE BORRADO.
export const pintarDiscos = (discos) => {
    const aside = document.getElementsByTagName('aside')[0];
    //Si ya se ha mostrado anteriormente los discos lo borramos por si ha habido algún cambio.
    aside.replaceChildren();
    aside.setAttribute('class', 'disco-db');
    //Título del aside de los discos.
    const h1 = document.createElement('h1');
    h1.textContent = 'Discos';
    aside.appendChild(h1);

    const divContenedorDiscos = document.createElement('div');


    for (const disco of discos) {
        const div = document.createElement('div');
        div.setAttribute('class', 'disco-card');

        const titulo = document.createElement('h3');
        titulo.textContent = disco.nombre;
        div.appendChild(titulo);

        const img = document.createElement('img');
        img.src = `${disco.caratula}`;
        img.alt = `Carátula del disco ${disco.nombre}`;
        div.appendChild(img);

        const  grupoInterprete = document.createElement('p');
        grupoInterprete.textContent = disco.grupoInterprete;
        div.appendChild(grupoInterprete);
        
        const año = document.createElement('p');
        año.textContent = disco.año;
        div.appendChild(año);

        const genero = document.createElement('p');
        genero.textContent = disco.genero;
        div.appendChild(genero);

        if(disco.prestado){
            const prestado = document.createElement('p');
            prestado.textContent = `Prestado`;
            div.appendChild(prestado);
        }

        const localizacion = document.createElement('strong');
        localizacion.textContent = disco.localizacion;
        div.appendChild(localizacion);

        const basura = document.createElement('button');
        const icono = document.createElement('img');
        icono.src = `./img/basura.svg`;
        basura.appendChild(icono);
        div.appendChild(basura);
        divContenedorDiscos.appendChild(div);
    }

    aside.appendChild(divContenedorDiscos);

    return aside;
}

export const limpiarFormulario = (formulario) => {
    formulario.reset();
}

//-------------------- MANEJO EN BASE DE DATOS ----------------------------

export const getAllDiscos = () => {
    const discosStr = localStorage.getItem('discos'); //Recogemos todos los discos.
    console.log(discosStr)
    return JSON.parse(discosStr);
}

export const getAllLocalizaciones = () => {
    const discosALocalizaciones = getAllDiscos();
    return discosALocalizaciones.map(disco => {
        if(disco.localizacion === '') return;
        return disco.localizacion;
    });
}

export const removeDiscoByLocalizacion = (localizacion) => {
    const discosJSON = getAllDiscos();

    const discosFiltrados = discosJSON.filter ((disco) => { //Filtramos los discos.
        disco.localizacion !== localizacion;
    });

    localStorage.setItem('discos', JSON.stringify(discosFiltrados)); // Actualizamos los discos.
}

export const filtrarDiscosPorNombre = (nombreAFiltrar) => {
    const discosJSON = getAllDiscos();

    return discosJSON.filter(disco => disco.nombre.toLowerCase().includes(nombreAFiltrar.toLowerCase()));
} 

/**
 * Función para guardar un disco en la base de datos.
 * @param {formulario} formulario 
 * @returns El disco que se ha guardado en la base de datos
 */
export const guardarDisco = (formulario) => {
    //Creamos el disco.
    let disco = crearDisco(formulario);

    let discos = getAllDiscos(); //Recogemos todos los discos de la base de datos.

    if(!discos){ // Si no hay discos en la base de datos.                                                                                                                   
        localStorage.setItem('discos', JSON.stringify([disco])); // Si no hay discos creamos el array con el primer disco.
    } else {
        //En cambio si ya hay discos en la base de datos.
        discos = [...discos, disco]; //Añadimos el disco en el array de discos.
        localStorage.setItem('discos', JSON.stringify(discos)); // Lo guardamos dentro de la base de datos.
    }
    return disco; 
}   

