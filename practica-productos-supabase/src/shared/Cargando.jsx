import "./Cargando.css";
import { useEffect, useState } from "react";

const Cargando = (props) => {
  const { contexto } = props;
  const [activo, setActivo] = useState(false);
  const tiempoDeEspera = 200; //Esperará el componente cargando unos 'X ms' para mostrarse.

  useEffect(() => {
    // 1. iniciamos el temporizador para hacer visible el componente cargando cuando el componente se monta.
    const temporizador = setTimeout(() => {
      //Después del `tiempoDeEspera` mostramos/hacemosVisible el componente cargando.
      setActivo(true);
    }, tiempoDeEspera);

    //Luego borramos este timeout si ha tenido o no ejecución (si se ha llevado a cabo la visualización de este componente).
    return () => clearTimeout(temporizador);
  }, []);

  return (
    <>
      {activo && (
        <div className="cargando-overlay">
          <div className="cargando-contenido">
            <div className="spinner"></div>
            {contexto && <p>{contexto}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default Cargando;
