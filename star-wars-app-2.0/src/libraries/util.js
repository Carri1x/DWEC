"use strict";

//Me he hecho una libreria útil para almacenar las funciones que puedan serme útiles y usarlas solo importando, sin que haga falta duplicar código.

export const isANumberAndInteger = (num) => {
    if (isNaN(num)) {
        console.log("Error. El dato debe ser un número.");
        return false;
    }
    if (!Number.isInteger(num)) {
        console.log("Error. El dato debe ser un número entero.");
        return false;
    }
    return true;
}

/**
 * Solo funciona si la fecha está de forma YYYY-MM-DD en cambio no se mostrará de la forma deseada.
 * @param {String} strFecha  
 * @returns Retorna la fecha de forma deseada. en este caso (DD/MM/YYYY)
 */
export const cambiarFechaFormatoEspanya = (strFecha) => {
    if (!strFecha) return 'No definida';
    const fechaPartida = strFecha.split('-');
    return `${fechaPartida[2]}/${fechaPartida[1]}/${fechaPartida[0]}`;
}

export const cambiarFormatoEspanya = (numero) => {
    return numero.toLocaleString("es-ES").replaceAll(".", ",");
}

export const cambiarGeneroEspanya = (genero) => {
    switch (genero.toLowerCase()) {
        case 'male':
            return 'Hombre';
        case 'female':
            return 'Mujer';
        case 'n/a':
            return 'No identificado';
        case 'none':
            return 'Sin género';
        default:
            return 'Género desconocido';
    }
}

export const cambiarFormatoFechaNacimiento = (fecha) => {
    if (fecha.endsWith("BBY")) {
        return fecha.replace("BBY", " Años después de la Batalla de Yavin");
    } else if (fecha.endsWith("ABY")) {
        return fecha.replace("ABY", " Años antes de la Batalla de Yavin");
    } else {
        return fecha;
    }
}

export const mostrarArray = (array) => {
    array.forEach(element => console.log(`+ ${element}. \n`));
}


export const printObject = (object) => {
    //Compruebo cada atributo del objeto.
    for (const clave in object) {
        //En caso de no tener esa propiedad la obviará.
        if (!object.hasOwnProperty(clave)) continue;

        //Obtengo el valor de la clave.
        const valor = object[clave];

        if (Array.isArray(valor)) {
            //Pongo directamente que es un array dado que JavaScript lo reconoce como Object y no como Array.
            console.log(`El atributo es: ${clave}, de tipo Array y contiene:`);
            printArray(valor);
        } else if (typeof valor === "object" && valor !== null) {
            console.log(`El atributo es: ${clave}, de tipo ${typeof valor} y contiene:`);
            printObject(valor);
        } else if (typeof valor === "number") {
            console.log(`El atributo es: ${clave}, de tipo ${typeof valor} y contiene: ${cambiarFormatoEspanya(valor)}.`);
        } else {
            console.log(`El atributo es: ${clave}, de tipo ${typeof valor} y contiene: ${valor}.`);
        }
    }
};

const printArray = (array) => {
    return array.forEach((element) => {
        //Si dentro del array hay otro array o un objecto seleccionamos que hacer con el.
        if (Array.isArray(element)) {
            printArray(element);
        }
        else if (typeof element === 'object' && element !== null) {
            //En caso de ser un objeto usamos la anterior función.
            printObject(element);
        } else if (typeof element === 'number') {
            //Si es simplemente un elemento lo imprimimos.
            console.log(cambiarFormatoEspanya(element));
        } else {
            console.log(element);
        }

    });
}

export const esPrimo = () => {
    if (numero <= 1) return false; // 0 y 1 no son primos
    if (numero === 2) return true; // 2 es el único número par primo
    if (numero % 2 === 0) return false; // los demás pares no son primos

    // Solo verifica hasta la raíz cuadrada del número
    const limite = Math.sqrt(numero);
    for (let i = 3; i <= limite; i += 2) {
        if (numero % i === 0) {
            return false;
        }
    }
    return true;
}

export const generarNumeroAleatorio = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

