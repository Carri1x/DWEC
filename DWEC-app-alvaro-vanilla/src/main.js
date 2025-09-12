import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import * as calculator from './calculadora.js';

console.log("Esta es la suma que sale de calculadora.js")
console.log(calculator.sumar(1,2));

console.log('Ahora vamos a hacer las demás operaciones'+
  '\nResta 1-1 = '+ calculator.restar(1,1)+
  '\nMultiplicación 2 x 2 = ' +calculator.multiplicar(2,2)+
  '\nDividir 4 % 2 ='+ calculator.dividir(4,2)
)
