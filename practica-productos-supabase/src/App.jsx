import "./App.css";
import Rutas from "./routes/Rutas";
import Footer from "./shared/Footer.jsx";
import Header from "./shared/Header.jsx";
import Menu from "./shared/Menu.jsx";
import ProveedorProductos from "./context/ProovedorProductos";
import ProveedorListaCompra from "./context/ProveedorListaCompra.jsx";
import useContextoSesion from "./hooks/useContextoSesion.js";

function App() {

  const {esAdmin} = useContextoSesion()

  return (
    <>
      <Header />
      <Menu />
      <main className="rutas-container">
        <ProveedorProductos>
          <ProveedorListaCompra>
            <Rutas />
          </ProveedorListaCompra>
        </ProveedorProductos>
      </main>
      <Footer />
    </>
  );
}
export default App;

/*
  Tengo que notificarte como me has dicho en clase que te haga.
  QUE:
  No voy a dejar que el usuario administrador pueda crear listas de la compra, como un usuario normal, 
  solo si se logea su propio usuario NO ADMINISTRADOR.

  No quiero darle poderes a este usuario administrador.

  Quiero que pueda editar y borrar productos, ver todas las listas de la gente y todos los usuarios que hay, pero no quiero que se cree sus propias cuentas.
  Básicamente porque para que quiere un usuario administrador crearse una lista personal de la compra, no tiene sentido; que se la haga con su propia cuenta personal.
*/


/*
--Primero de todo me hago la tabla Roles.

CREATE TABLE public.roles (
  id_rol UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  rol TEXT DEFAULT 'usuario' CHECK (rol IN ('usuario', 'administrador')) -- Validación opcional pero recomendada
);

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

--CREAMOS TABLA PERFILES

CREATE TABLE public.perfiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nombre_completo text,
  avatar_url text,
  descripcion text
);

ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;

--Creo la función para cuando se inserta un usuario en AUTH.USERA

CREATE OR REPLACE FUNCTION public.manejar_nuevo_usuario()
RETURNS TRIGGER AS $$
BEGIN
  -- Primero: Metemos al usuario en la tabla roles
  INSERT INTO public.roles (id_rol, email, rol)
  VALUES (NEW.id, NEW.email, 'usuario');

  -- Segundo: Le creamos su perfil por defecto
  -- Usamos COALESCE por si acaso el nombre viene vacío, que no de error
  INSERT INTO public.perfiles (id, nombre_completo, avatar_url, descripcion)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'Nuevo Usuario'),
    '',
    ''
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- CREAMOS EL TRIGGER QUE ESCUCHA A SUPABASE AUTH

CREATE TRIGGER al_crear_usuario_auth
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.manejar_nuevo_usuario();


--NO SE PORQUÉ PERO NO ME DEJABA INSERTAR DABA UN ERROR EN LA BASE DE DATOS, NINGUNA INFORMACIÓN MÁS.
--AL FINAL HE DADO CON QUE ERA LA FOREIGN KEY, LA HE QUITADO Y ME FUNIONABA PERO TENÍA QUE ESTAR CONECTADA LA TABLA AUTH CON LAS DE perfiles y roles,  ENTONCES
-- HE AÑADIDO LAS CONSTRAINTS...

ALTER TABLE public.roles 
ADD CONSTRAINT roles_id_rol_fkey 
FOREIGN KEY (id_rol) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.perfiles 
ADD CONSTRAINT perfiles_id_fkey 
FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;



--Ahora hemos creado una politica para ver por lo menos el rol y saber si es admin o no.

alter policy "SELECT Ver el rol si tienes el mismo id o eres admin"
on "public"."roles"
to authenticated
using (
  ((auth.uid() = id_rol) OR is_admin())
);


--Ahora hemos creado una política para ver el perfil propio o ver todos los perfiles si eres admin.

alter policy "SELECT Ver tu perfil si coincide con tu id o si eres admin ves "
on "public"."perfiles"
to authenticated
using (
  ((auth.uid() = id) OR is_admin())
);


 */
