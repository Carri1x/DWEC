"use strict";
const usuarios = [
    {
        nombre: "Luis",
        preferencias: { tema: "oscuro", idioma: "español", edad: 25 },
        contacto: {
            direccion: {
                calle: "Calle falsa, 666",
                localidad: "Elda",
                pais: "España",
            },
            correoelectronico: "correofalso@yahoo.com",
            telefono: "123456789",
        },
    },
    {
        nombre: "Marta",
        preferencias: { tema: "claro", idioma: "catalán", edad: 15 },
        contacto: {
            direccion: {
                calle: "Calle también falsa, 123",
                localidad: "Andorra la Vella",
                pais: "Andorra",
            },
            correoelectronico: "correoandorrano@gmail.com",
            telefono: "",
        },
    },
    {
        nombre: "Alberto",
        preferencias: { tema: "oscuro", idioma: "español", edad: 56 },
        contacto: {
            direccion: {
                calle: "Elm Street, 666",
                localidad: "Petrer",
                pais: "España",
            },
            correoelectronico: "correonulo@yahoo.com",
            telefono: "548632478",
        },
    },
    {
        nombre: "Jacinto",
        preferencias: { tema: "claro", idioma: "inglés", edad: 17 },
        contacto: {
            direccion: {
                calle: "Elm Street, 667",
                localidad: "Elda",
                pais: "España",
            },
            correoelectronico: "correofalso@gmail.com",
            telefono: "",
        },
    },
    {
        nombre: "Rigoberta",
        preferencias: { tema: "claro", idioma: "francés", edad: 34 },
        contacto: {
            direccion: {
                calle: "Calle inexistente, 6",
                localidad: "Burdeos",
                pais: "Francia",
            },
            correoelectronico: "correofalso@gmail.com",
            telefono: "232547859",
        },
    },
    {
        nombre: "Sandra",
        preferencias: { tema: "oscuro", idioma: "español", edad: 18 },
        contacto: {
            direccion: {
                calle: "Calle de mentira, s/n",
                localidad: "Petrer",
                pais: "España",
            },
            correoelectronico: "estecorreonoexiste@gmail.com",
            telefono: "452158697",
        },
    },
    {
        nombre: "Sandra",
        preferencias: { tema: "oscuro", idioma: "español", edad: 18 },
        contacto: {
            direccion: {
                calle: "Calle existente, 34",
                localidad: "Petrer",
                pais: "España",
            },
            correoelectronico: "correoinexistente@yahoo.com",
            telefono: "",
        },
    },
];

//Función que inserta un nuevo usuario en el array de usuarios y devuelve el nuevo array.
export const insertarUsuario = (nuevoUsuario) => {
    //Aqui no he usado un push porque no quieres modificar el array original.
    return [...usuarios, nuevoUsuario];
}

//Función que devuelve un array con los usuarios mayores de edad.
export const usuariosMayoresDeEdad = () => {
    return usuarios.filter(usuario => usuario.preferencias.edad >= 18);
}

//Función que devuelve un array con los usuarios que tienen correo de Yahoo.
export const usuariosCorreoYahoo = () => {
    return usuarios.filter(usuario => usuario.contacto.correoelectronico.endsWith("@yahoo.com"));
}

//Función que devuelve un array con los usuarios que tienen el tema claro, son mayores de edad y son de España.
export const usuariosTemaClaroMayoresDeEdadEspañoles = () => {
    return usuarios.filter(usuario => usuario.preferencias.tema === "claro" && usuario.preferencias.edad >= 18 && usuario.contacto.direccion.pais === "España");
}

// Función que devuelve un array de usuarios a los que les falte algún dato.
export const usuariosSinAlgunDato = (usuarios) => {
    return usuarios.filter(usuario => usuarioSinDatos(usuario));
};

const usuarioSinDatos = (obj) => {
    // Recorremos cada clave del objeto
    for (const key in obj) {
        // Nos aseguramos de que la propiedad pertenece al objeto y no a su prototipo
        if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
        const value = obj[key];

        // Si el valor es null, undefined o string vacío → falta dato
        if (value === null || value === undefined || value === "") {
            return true;
        }

        // Si el valor es un objeto comprobamos recursivamente
        if (typeof value === "object" && !Array.isArray(value)) {
            if (usuarioSinDatos(value)) {
                return true;
            }
        }

        // Ahora comprobamos si es un array.
        // En ese caso comprobamos cada elemento del array.
        if (Array.isArray(value)) {
            for (const item of value) {
                // Si el elemento es un objeto volvemos a comprobar recursivamente.
                if (typeof item === "object") {
                    if (usuarioSinDatos(item)) {
                        return true;
                    }
                    // Si no es un objeto comprobamos si es null, undefined o string vacío.
                } else if (item === null || item === undefined || item === "") {
                    return true;
                }
            }
        }
    }
    return false;
};

// Función que inserta el apellido "No indicado" a todos los usuarios y devuelve el nuevo array.
export const insertarApellido = (usuarios) => {
    // Recorremos el array de usuarios y añadimos el apellido a cada uno.
    return usuarios.map((usuario) => {
        // Usamos el operador spread para copiar el objeto y añadir el nuevo atributo.
        return { ...usuario, apellido: "No indicado" };
    });
}

// Función que inserta el código postal "00000" a todos los usuarios y devuelve el nuevo array.
export const insertarCodigoPostal = (usuarios) => {
    // Recorremos el array de usuarios y añadimos el código postal a cada uno.
    return usuarios.map((usuario) => {
        // Usamos el operador spread para copiar el objeto y añadir el nuevo atributo.
        // Dado que el código postal está dentro de varios objetos anidados, usamos el operador spread varias veces.
        return {...usuario, contacto: {...usuario.contacto, direccion: {...usuario.contacto.direccion, codigopostal: "00000"}}};
    });
}