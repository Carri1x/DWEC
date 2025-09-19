import './App.css'
import Contenedor from './components/Contenedor.jsx';
import Pelicula from './components/Pelicula.jsx';
import Interprete from './components/Interprete.jsx';

function App() {
  let nameAplication = "Práctica 2.03";
  return (
    <>
      <h1>{nameAplication}</h1>
      <Contenedor>
        <Pelicula 
          title="Matrix"
          director="Lana Wachowski"
          movieListing="https://m.media-amazon.com/images/I/71D8+NFLZmL._UF1000,1000_QL80_.jpg"
          summary="Representa un futuro distópico en el que la humanidad está atrapada sin saberlo dentro de una realidad 
              simulada llamada Matrix, que las máquinas inteligentes han creado para distraer a los humanos mientras 
              usan sus cuerpos como fuente de energía en campos de cultivo."
          >
           <Interprete 
                    name="Keanu Reeves" 
                    photo="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRsex5VNCCLIEXGQ14XLGX1scesp-88zkFoP-NZi0MqIPmtZ69koAx8o4fv494SCvrScUVWENwTPY9CeOtvoWk2BWE3Qq-uYF6ZBwlNQpKf"
                    >
                    <p>
                      Keanu Charles Reeves es un actor y músico canadiense.​
                      Ha recibido numerosos reconocimientos en el cine que abarca cuatro décadas. 
                      En 2020, The New York Times lo clasificó como el cuarto mejor actor del siglo XXI,
                      y en 2022 la revista Time lo nombró una de las 100 personas más influyentes del mundo.
                    </p>
                </Interprete>
                <Interprete
                    name="Laurence Fishburne"
                    photo="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTRmGP_lgdM7MA6BTtAmn9jxArYTiQ0moLqGer6mZI221lVxk1ILbbfILcOzydp-2CB7c1S25uOonTmwNrNkU9Xye8C-Y0xutc-JZEOhqkdgg"
                    >
                    <p>
                      Laurence John Fishburne III, conocido como Laurence Fishburne, es un actor de cine estadounidense.
                      Destaca principalmente por su rol como Morfeo en la película de ciencia ficción The Matrix y sus secuelas.
                    </p>
                </Interprete> 
        </Pelicula>
      </Contenedor>
    </>
  )
}

export default App;
