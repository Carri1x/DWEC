"use strict";

import { isANumberAndInteger } from "./util.js";

const minDeLetras = 5;
const regexMinDeLetras =new RegExp(`^[a-zA-Z\\s]{${minDeLetras},}$`);
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
            if(!nombreValido(value)){ //Si el nombre no es válido insertamos un mensaje de error.
                errorActual = mensajeDeError.nombre;
            }
            break;
        case 'caratula':
            if(!caratulaValida(value) ){ //Si la carátula no es válida insertamos un mensaje de error.
                errorActual = mensajeDeError.caratula;
            }
            break;
        case 'grupoInterprete':
            if(!grupoInterpreteValido(value)){ //Si el grupo o intérprete no es válido insertamos un mensaje de error.
                errorActual = mensajeDeError.grupoInterprete;
            }
            break;
        case 'año':
            if(!añoValido(value)){ //Si el año no es válido insertamos un mensaje de error.
                errorActual = mensajeDeError.año;
            }
            break;
        case 'localizacion':
            if(!localizacionValida(value)){//Si la localización no es válida insertamos un mensaje de error.
                errorActual = mensajeDeError.localizacion;
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

export const formularioVacio = (formulario) => {

    for (const atributo in formulario) {
        if (!Object.hasOwn(formulario, atributo)) continue;
        const valor = formulario[atributo];
        //Pasamos olímpicamente del checkbox, lo queremos controlar de otra forma.
        //Solo vamos a controlar aquí los inputs tipo text.
        if (typeof valor !== 'boolean' && valor !== "") {
            // Si encontramos algo escrito, devolvemos false (NO está vacío).
            return false; 
        }
    }

    return true;
}

export const camposEditados = (original, formulario) => {
    const camposNuevos = {};

    for (const atributo in formulario) {
        if (!Object.hasOwn(formulario, atributo)) continue;
        //Si los valores son diferentes es que se ha editado el disco.
        if(original[atributo] !== formulario[atributo]) {
            //Si hay cambios añadimos el valor en el objeto para editar.
            camposNuevos[atributo] = formulario[atributo];
        }
    }

    return camposNuevos;
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



//Verdaderamente esta función solo funciona para este formulario. Habría que hacer un método que sirviera para todos los formularios.
export const crearDisco = (form) =>{
    return {
        id: crypto.randomUUID(),
        nombre: form.nombre,
        caratula: form.caratula,
        grupoInterprete: form.grupoInterprete,
        año: form.año,
        genero: form.genero,
        localizacion: form.localizacion,
        prestado: form.prestado
    }
}

/**
 * Función que devuelve true en caso de que alguno de los atributos coincida con el filtro
 * que ha elegido el usuario. Si devuelve false es que no ha coincidido el filtro con el valor de los atributos del disco. 
 * @param {Disco a comprobar} disco 
 * @param {Filtro introducido por el usuario} caracteristicaParaFiltrar 
 */
export const filtroDiscos = (disco , caracteristicaParaFiltrar) =>{
    for (const atributo in disco) {
        if (!Object.hasOwn(disco, atributo)) continue;
        if (typeof disco[atributo] !== "string" || disco[atributo] === '') continue;
        if (atributo === 'uuid')continue; 
        const valor = disco[atributo].toLowerCase();
        if(valor.includes(caracteristicaParaFiltrar.toLowerCase())) return true;
    }
    return false;
}


export const filtrarDiscosPorNombre = (nombreAFiltrar) => {
    const discosJSON = getAllDiscos();

    return discosJSON.filter(disco => disco.nombre.toLowerCase().includes(nombreAFiltrar.toLowerCase()));
} 
