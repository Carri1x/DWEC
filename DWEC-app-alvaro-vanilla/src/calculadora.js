/**
 * Declaración y definición de funciones a exportar.
 * */

function sumar(x, y) {
  return x + y;
}

function restar(x, y) {
  return x - y;
}

function multiplicar(x, y) {
  return x * y;
}

/**
 * Exporta directamente la función Dividir.
 * */

export function dividir(x, y) {
  let division = 0;
  if (y === 0) {
    division = "No se puede dividir entre 0.";
  } else {
    division = x / y;
  }
  return division;
}

/**
 *   Exporta los elementos situados entre las llaves.
 * */

export { sumar, restar, multiplicar };

/**
 * Exporta el elemento con un seudónimo.
 * */

export { multiplicar as multi };
