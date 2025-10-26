import React from 'react';
import Interprete from '../components/Interprete.jsx';
import './Interpretes.css';

const Interpretes = () => {
    return (
        <>
            <h1>Intérpretes</h1>
            <div className='container-interpretes'>

                <Interprete
                    nombre="Keanu Reeves"
                    foto="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRsex5VNCCLIEXGQ14XLGX1scesp-88zkFoP-NZi0MqIPmtZ69koAx8o4fv494SCvrScUVWENwTPY9CeOtvoWk2BWE3Qq-uYF6ZBwlNQpKf"
                >
                    <p>
                        Keanu Charles Reeves es un actor y músico canadiense.
                        Ha recibido numerosos reconocimientos en el cine que abarca cuatro décadas.
                        En 2020, The New York Times lo clasificó como el cuarto mejor actor del siglo XXI,
                        y en 2022 la revista Time lo nombró una de las 100 personas más influyentes del mundo.
                    </p>
                </Interprete>
                <Interprete
                    nombre="Laurence Fishburne"
                    foto="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTRmGP_lgdM7MA6BTtAmn9jxArYTiQ0moLqGer6mZI221lVxk1ILbbfILcOzydp-2CB7c1S25uOonTmwNrNkU9Xye8C-Y0xutc-JZEOhqkdgg"
                >
                    <p>
                        Laurence John Fishburne III, conocido como Laurence Fishburne, es un actor de cine estadounidense.
                        Destaca principalmente por su rol como Morfeo en la película de ciencia ficción The Matrix y sus secuelas.
                    </p>
                </Interprete>
                <Interprete
                    nombre="Jamie Foxx"
                    foto="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZzn7jHMgABJ4mHy14D0uMoQnPilhj06WazcylhfuTO526ybsEsDDKENf1ZcU8QwyJxX9QAhjfdoUh7UYl114h_04FvCZmI6fx3htayvttnQ"
                >
                    <p>
                        Eric Marlon Bishop, más conocido como Jamie Foxx, es un actor, comediante, productor discográfico y cantante de R&B estadounidense.
                        Foxx se hizo muy conocido por su interpretación de Ray Charles en la película biográfica Ray de 2004, por la que ganó un Premio Óscar,
                        un Globo de Oro, un BAFTA y un Premio del Sindicato de Actores como Mejor Actor,
                        siendo uno de los pocos actores afroamericanos en ganar los premios principales en la industria cinematográfica.
                    </p>
                </Interprete>
                <Interprete
                    nombre="Leonardo DiCaprio"
                    foto="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQcbqOH4dzt57bdZ0K36CHrRkhqgtGgwIrA7mHoA4M0cc8x239pMR-h28FlqERzrqW0GVMn1-Ok_LD0-KjYHnQCBki8Hqr50uPbUiPTn5UAhNDJa9Mtu-dp2JjcSYYNptQ97eLLy6_0DFEP"
                >
                    <p>
                        Leonardo Wilhelm DiCaprio es un actor y productor de cine estadounidense.
                        Es ganador de numerosos premios, entre los que destacan un Óscar al mejor actor y un premio BAFTA al mejor actor por su actuación en El renacido (2015)
                        ,dos Globos de Oro al mejor actor de drama por sus actuaciones en El aviador (2004)
                        y El renacido; y un Globo de Oro al mejor actor de comedia o musical por El lobo de Wall Street (2013).
                        Adicionalmente, ha ganado el premio del Sindicato de Actores, el Oso de Plata y un Premio Chlotrudis.
                        Hasta 2019, sus películas habían recaudado aproximadamente 7200 millones de dólares, y ha estado ocho veces en la lista de los actores mejor pagados del año.
                    </p>
                </Interprete>
                <Interprete
                    nombre="Mark Ruffalo"
                    foto="https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg/250px-Mark_Ruffalo_%2836201774756%29_%28cropped%29.jpg"
                >
                    <p>
                        Mark Alan Ruffalo es un actor, director, productor y guionista estadounidense.
                        Ha sido nominado a tres premios Óscar, dos Globos de Oro y un premio BAFTA.
                        Ruffalo es conocido por interpretar a Bruce Banner / Hulk en el Universo Cinematográfico de Marvel,
                        apareciendo por primera vez en The Avengers (2012) y repitiendo su papel en varias películas posteriores de la franquicia.
                    </p>
                </Interprete>
            </div>
        </>
    )
}

export default Interpretes;
