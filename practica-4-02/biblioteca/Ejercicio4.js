"use strict";

let imagenes = [
    'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg',
    'https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF1000,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/I/71DJIt8Q3OL._AC_UF894,1000_QL80_.jpg',
    'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale,dpr_1.5/jackets/9781628926552.jpg'
];


export const carruselImagenes = (urlImagen) => {
    let contenedorPeliculas = document.getElementById('carrusel-peliculas');
    let imagen = contenedorPeliculas.children[0];
    let contador = 9;
    setTimeout(()=>{
        console.log('hace algo')
    },1920);
    let transicion = setInterval(() => {
        imagen.setAttribute('style', `opacity: 0.${contador--};`);
        if (contador <= 0) {
            contador = 9;
            clearInterval(transicion);
        }
    }, 50);
    imagen.setAttribute('src', urlImagen);
    imagen.setAttribute('style', `opacity: 1;`);
}
