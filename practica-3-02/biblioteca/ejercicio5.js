"use strict";

export const printObject = (object) =>{
    for (const key in object) {
        if(typeof key === 'Array'){
            key.forEach(element => {
               console.log(element); 
            });
        }
        if(typeof key === '')
    }
}