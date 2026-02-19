import './Perfil.css';
import useContextoSesion from "../hooks/useContextoSesion.js";
import iconoUsuarioDefault from '../assets/icono-usuario.png';
import iconoEditar from '../assets/icono-editar.png';
import iconoCancelar from '../assets/cancelar-rojo.png';
import useContextoListaCompra from '../hooks/useContextoListaCompra';
import { useEffect, useState } from 'react';

const Perfil = () => {
    const { 
        perfil,
        esAdmin,
        editarUsuario,
    } = useContextoSesion();

    const { 
        listasCompra ,
        cargarListasCompra,
        cargarListaPorID,
        
    } = useContextoListaCompra();

    const [totalProd, setTotalProd] = useState(0);
    const [modoEditar, setModoEditar] = useState(false);

    const fromularioInicial = {
        nombre_completo: `${perfil?.nombre_completo}`,
        avatar_url: `${perfil?.avatar_url}`,
        descripcion: `${perfil?.descripcion}`,
    }

    const [formulario, setFormulario] = useState(fromularioInicial);

    const actualizarEstadoPerfil = (evento) => {
        const {name, value} = evento.target;
        setFormulario({...formulario, [name]: value});
    }

    /**
     * Función que cuenta el total de los productos
     * 
     * @returns el total de los productos.
     * @async
     */
    const totalProductos = async() => {

        let listasCompletas = listasCompra.map( async(lista) => {
            return await cargarListaPorID(lista.id, false);
        })

        listasCompletas = await Promise.allSettled(listasCompletas);

        listasCompletas = listasCompletas.map(lista => lista.value);
        
        return listasCompletas.reduce((acum, lista) => {
        // 2. Verificamos que la lista tenga productos antes de reducir
            const productosEnLista = Array.isArray(lista.productos) 
                ? lista.productos.reduce((acumulado, producto) => {
                    // 3. Aseguramos que cantidad sea un número (por si viene como string o null)
                    const cantidad = Number(producto.cantidad) || 0;
                    return acumulado + cantidad;
                }, 0)
                : 0;

            return acum + productosEnLista;
        }, 0);
    };



    useEffect(() => {
        if(esAdmin) return;
        if (!listasCompra || !Array.isArray(listasCompra)) {
            cargarListasCompra(perfil.id);
            return;
        };
        const total = totalProductos();
        setTotalProd(total);
    },[listasCompra]);

    return (
        <div className="perfil-container">
            <div className="perfil-card">
                
                {/* Cabecera: Banner y Foto */}
                <div className="perfil-header">
                    <div className="perfil-banner"></div>
                    <div className="perfil-avatar-wrapper">
                        <img 
                            className="perfil-avatar"
                            src={perfil?.avatar_url ? perfil.avatar_url : iconoUsuarioDefault} 
                            alt="Foto de perfil" 
                        />
                        { //Si no es administrador mostramos el icono de editar y luego sus posteriores inputs para la edición.
                        !esAdmin && (
                            <>
                                {modoEditar ?
                                    <img src={iconoCancelar} alt='icono-cancelar'
                                        onClick={() => {
                                            setModoEditar(false);
                                            setFormulario(fromularioInicial);
                                        }} />
                                    :
                                    <button className="btn-editar-foto" onClick={() => {
                                        setModoEditar(true);
                                    }}>
                                        <img src={iconoEditar} alt="Editar" />
                                    </button>
                                }
                                {modoEditar &&
                                    <>
                                        <input type="text" name="avatar_url" id="avatar_url" placeholder='Url de la foto de perfil'
                                            value={formulario?.avatar_url|| ""}
                                            onChange={(evento) => {
                                                actualizarEstadoPerfil(evento)
                                            }}
                                        />
                                    </>}
                            </>
                        )}
                        
                    </div>
                </div>

                {/* Información del usuario */}
                <div className="perfil-info">
                    <h2 className="perfil-nombre">
                        {perfil?.nombre_completo || "Usuario Anónimo"}
                    </h2>
                    <span className="perfil-username">@{perfil?.nombre_completo?.toLowerCase().replace(/\s/g, '') || "usuario"}</span>
                    {modoEditar && 
                        <input type="text" name="nombre_completo" id="nombre_completo" placeholder='Nombre completo' 
                            value={formulario?.nombre_completo|| ""}
                            
                            onChange={(evento) => {
                                actualizarEstadoPerfil(evento)
                            }}
                        />
                    }
                    
                    <div className="perfil-divisor"></div>
                    {!esAdmin &&
                        <div className="perfil-bio">
                            <h3>Sobre mí</h3>
                            <p>{perfil?.descripcion ? perfil.descripcion : "Escribe algo increíble..."}</p>
                            {modoEditar &&
                                <textarea name="descripcion" id="descripcion" placeholder='Escribe algo increíble...'
                                    value={formulario?.descripcion || ""}
                                    onChange={(evento) => {
                                        actualizarEstadoPerfil(evento)
                                    }}
                                ></textarea>

                            }
                        </div>
                    }

                    {
                        modoEditar && 
                        <button onClick={() => {
                            editarUsuario(formulario);
                        }}>
                            Guardar Cambios
                        </button>
                        }
                </div>

                {/* Footer o Stats (Opcional, para rellenar) */}
                <div className="perfil-footer">
                    {esAdmin ? 
                        <p>
                            Perfil de administración.
                        </p> : 
                        <>
                            <div className="stat-item">
                                <strong>{listasCompra.length}</strong>
                                <span>Listas</span>
                            </div>
                            <div className="stat-item">
                                <strong>{totalProd}</strong>
                                <span>Productos</span>
                            </div>
                        </>
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default Perfil;