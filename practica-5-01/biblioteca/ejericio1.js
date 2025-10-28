"use strict";

export const repetirSaludo = () => {
    let body = document.getElementsByTagName('body');
    return setInterval(() => {
        let h1 = document.createElement('h1');
        h1.textContent = 'Hola feo'; 
        body[0].appendChild(h1);
    }, 1000);
}