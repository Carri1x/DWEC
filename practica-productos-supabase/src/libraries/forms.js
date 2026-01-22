"use strict";

const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const minCaracteresPassword = 6;

export const validarFormulario = (form) => {
    let errores = {};
    if(!emailValido(form.email)) {
        errores = {email: 'Tiene que ser un email válido: ejemplo@ejemploEmail.com'}
    }
    if(!passwordValida(form.password)) {
        errores = {...errores, password: `La contraseña tiene que contener al menos ${minCaracteresPassword} caracteres.`}
    }
    return errores;
}

const emailValido = (email) => {
    return regexCorreo.test(email);
}

const passwordValida = (password) => {
    return (password?.length || 0) >= minCaracteresPassword;
}