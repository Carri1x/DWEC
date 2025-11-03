"use strcit";

window.onload = () => {
  let numRandom = Math.floor(Math.random() * 9);
  console.log(numRandom)

}; //FIN DE WINDOW.ONLOAD

const crearLayout = () => {
  let divs = document.getElementsByTagName("div");
  let imagenesUsadas = [];
  for (let i = 1; i < 10; i++) {
    let img = document.createElement("img");
    let numRandom = Math.random() + 10;
    img.src = `./img/${i}.png`;
    divs[0].appendChild
  }
};
