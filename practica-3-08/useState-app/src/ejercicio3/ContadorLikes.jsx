import React, { useState } from "react";
import './ContadorLikes.css';

const ContadorLikes = () => {
    let [likes, setLikes] = useState(0);
    let [dislikes, setDislikes] = useState(0);

    //He estado probando setLikes(likes++) e igual para dislikes y no funciona muy bien, funciona mejor de esta forma.

    /**
     * Función para incrementar el número de likes.
     */
    const incrementarLikes = () => {
        likes += 1;
        setLikes(likes);
    }

    /**
     * Función para incrementar el número de dislikes.
     */
    const incrementarDislikes = () => {
        dislikes += 1;
        setDislikes(dislikes);
    }

    return(
        <>
            <h5>¡¡Dale me gusta si quieres que saque un diez en todo!!</h5>
            <h5>¡¡Dale a NO me gusta para que no suspenda!!, ¡¡JAJAJAJAJ!!</h5>
            
            <button
                className="contador-likes-button likes"
                onClick={() => {
                    //Llamamos a la función para incrementar los likes.
                    incrementarLikes();
                }}
            >
                {likes}
                <img src="./src/assets/mano-likes.png" alt="Me gusta." />
            </button>
            <button
                className="contador-likes-button dislikes"
                onClick={() => {
                    //Llamamos a la función para incrementar los dislikes.
                    incrementarDislikes();
                }}
            >
                {dislikes}
                <img src="./src/assets/mano-dislike.webp" alt="No me gusta." />
            </button>
        </>
    );
}

export default ContadorLikes;