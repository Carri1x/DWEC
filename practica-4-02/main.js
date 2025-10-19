"use strict" ;
import {sustituirContenidoBloqueado} from './biblioteca/Ejercicio1.js';
import {crearTabla, cambiarColorNumPrimos} from './biblioteca/Ejercicio2.js';
import {cambiarColorParrafos} from './biblioteca/Ejercicio3.js';
import { carruselImagenes } from './biblioteca/Ejercicio4.js';


//Ejercicio 1--------------------------------------------------------------------------------------------------------------------------------
setTimeout(()=>{
    sustituirContenidoBloqueado();
},2000);

//Ejercicio 2--------------------------------------------------------------------------------------------------------------------------------
crearTabla(10,10);

setTimeout(()=>{
    cambiarColorNumPrimos();
},1000);

/*setTimeout(()=>{
    cambiarColorNumPrimos();
},2000); No me va de esta forma cuando pongo 2000 no me funciona. Solo me funciona con 1000 ms.*/


//Ejercicio 3--------------------------------------------------------------------------------------------------------------------------------
/*
Comento esta línea para que no cambie el color cada segundo automáticamente.
Cuando quieras corregir el ejercicio descoméntala.
Que pases buena semana en Barcelona :)

setInterval(()=>{
    cambiarColorParrafos();
},1000);
*/

//Ejercicio 4--------------------------------------------------------------------------------------------------------------------------------
/**
 * No me ha salido como yo quería pero funciona. Mal pero funciona.
 * No se si me he estado complicando la vida pero lo he intentado hacer. No sale de la forma que me gustaría.
 * He intentado hacer de mil maneras que esperara el intervalo hasta los ultimos 50 ms para hacer la opacidad, no he conseguido hacerlo...
 * 
 * Me gustaría que corriguieras por encima el ejercicio en clase o que me lo dejaras anotado en algún sitio...
 * Gracias y perdona por este ejercicio, es lamentable...
 */


let imagenes = [
    'https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_.jpg',
    'https://m.media-amazon.com/images/I/912AErFSBHL._AC_UF1000,1000_QL80_.jpg',
    'https://m.media-amazon.com/images/I/71DJIt8Q3OL._AC_UF894,1000_QL80_.jpg',
    'https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale,dpr_1.5/jackets/9781628926552.jpg'
];
let contador = 1;
setInterval(()=>{
    contador++;
    if(contador >= 4){
        contador = 0;
    }
    carruselImagenes(imagenes[contador]);
},2000)

