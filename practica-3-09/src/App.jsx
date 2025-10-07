import './App.css'
import Matricula from './componentes/Matricula';
import discentes from "./repositorio/matriculados.json";



function App() {

  return (
    <>
      <Matricula alumnos = {discentes}/>
    </>
  )
}

export default App
