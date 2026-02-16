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
  console.log(esAdmin)
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
--VOY A IR EJECUTANDO POLITICAS EN CÓDIGO PLSQL Y NO POR INTERFAZ DE SUPABASE PARA PORDER COPIANDO Y PEGANDO A ESTE COMENTARIO.
--Primero de todo me hago la tabla Roles.

CREATE TABLE public.roles (
  id_rol UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  rol TEXT DEFAULT 'usuario' CHECK (rol IN ('usuario', 'administrador')) -- Validación opcional pero recomendada
);

ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;

---

--Creo la función para asignar a quien se registre el rol usuario:
--CREATE OR REPLACE FUNCTION public.handle_new_user_role()
BEGIN
  INSERT INTO public.roles (id_rol, email, rol)
  VALUES (NEW.id, NEW.email, 'usuario');
  RETURN NEW;
END;

--He tenido que asignar que devuelve un type trigger, y que el type of security es security definer.

--Luego he creado el trigger.

CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_role();


---

--Perfecto he insertado un nuevo usuario y me sale en la tabla de roles como usuario.

--Luego hecho una actulaización a mano:

UPDATE public.roles 
SET rol = 'administrador' 
WHERE email = 'alvarocarrion.git@gmail.com';

---

--Ahora para no repetir políticas voy a crear una función auxiliar que nos diga si el usuario actual es admin.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.roles 
    WHERE id_rol = auth.uid() AND rol = 'administrador'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

--- 

--He hido cambiando en cada una de las políticas que tenía ya hechas en interfaz de supabase.

--BORRAR PRODUCTOS:

alter policy "Borrar productos a usuarios autenticados y administradores"
on "public"."Productos"
to authenticated
using (
  is_admin()
);

--EDITAR PRODUCTOS:

alter policy "Editar productos administradores autenticados"
on "public"."Productos"
to authenticated
using (
  is_admin()
) with check (
  is_admin()
);

--INSERTAR PRODUCTOS:

alter policy "Insertar productos para administradores autenticados"
on "public"."Productos"
to authenticated
with check (
  is_admin()
);


------------LISTAS---------------

--VER LISTAS:


alter policy "SELECT Propietario o administrador. AUTENTICADOS"
on "public"."ListasCompra"
tO authenticated
using (
  ((auth.uid() = id_propietario) OR is_admin())
);

-- TODO LO DEMÁS:

alter policy "Todas las peticiones permitidas a usuarios Autenticados"
on "public"."ListasCompra"
to authenticated
using (
  (auth.uid() = id_propietario)
) with check (
  (auth.ui

);


-- PRODUCTOS EN LA LISTA 

-- VER PRODUCTOS DE UNA LISTA:

create policy "SELECT ListaCompra_Productos a administradores autenticados"
on "public"."ListasCompra_Productos"
as PERMISSIVE
for SELECT
to authenticated
using (
is_admin()
);


--------------CREAMOS LA TABLA PERFILES Y UNA FUNCIÓN PARA INERTAR SUS DATOS CUANDO REGISTRAMOS A ALGUIEN EN AUTH--------------

--CREAMOS TABLA PERFILES
CREATE TABLE public.perfiles (
  id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  nombre_completo text,
  avatar_url text,
  descripcion text
);

ALTER TABLE public.perfiles ENABLE ROW LEVEL SECURITY;

---creamos FUNCION DE INSERTAR DATOS EN EL PERFIL DEL NUEVO USUARIO.

CREATE OR REPLACE FUNCTION public.handle_new_user_profile() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.perfiles (id, nombre_completo, avatar_url, descripcion)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'display_name',
    '', 
    ''
  ); 
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

--CREAMOS EL TRIGGER PARA CUANDO EL USUARIO SE HA CREADO.

CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_profile();

--CREAMOS LA POLÍTICA DE VER EL PERFIL:

alter policy "SELECT perfil de usuario el propio usuario o un administrador"
on "public"."perfiles"
to authenticated
using (
  ((auth.uid() = id) OR is_admin())
);

--CREAMOS LA POLÍTICA DE EDITAR CADA UNO SU PROPIO PERFIL. 

alter policy "UPDATE su propio perfil de usuario autenticado"
on "public"."perfiles"
to authenticated
using (
  auth.uid() = id
) with check (
  auth.uid = id
)



 */
