import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"

//Props ->Propiedades - para pasar variables o funciones de otros componentes
//Ejemplo - <Header nombreProp= {datos o Funciones}/>

function App() {

  const [ingresado, setIngresado] = useState(false);

  // const[pacientes , setPacientes]= useState([]);
  // const [paciente, setPaciente] = useState({});

  const [pacientes, setPacientes] = useState(() =>
    JSON.parse(localStorage.getItem('pacientes')) || []);
    const[paciente, setPaciente]= useState({});

 /*  useEffect(() => {
    const obtenerLS=() => {
      const pacientesLS =  JSON.parse(localStorage.getItem('Pacientes')) ?? [];
      setPacientes(pacientesLS)
    }
    obtenerLS()
  }, [])
 */
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes));
  }, [pacientes])

  const eliminarPaciente = (id) =>{
    //console.log('Eliminando paciente', id)
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

   // 🔵 Pantalla de bienvenida
  if (!ingresado) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-teal-200 rounded-full opacity-10"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-300 rounded-full opacity-10"></div>
        
        <div className="relative z-10">
          <img
            src="src/img/1234.jpg" 
            className="w-40 h-40 mb-8 object-cover rounded-full border-4 border-white shadow-lg" 
          />
        </div>

        <button
          onClick={() => setIngresado(true)}
          className="relative z-10 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300"
        >
          Ingresar
        </button>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-cyan-100 p-6">
    <div className="flex justify-end mb-4">
      <button
        onClick={() => setIngresado(false)}
        className="bg-cyan-800 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded"
      >
        Salir
      </button>
    </div>

    <div className="max-w-7xl mx-auto mt-10 bg-white rounded-2xl shadow-xl p-10">
      <Header />

      <div className="mt-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  </div> 
  );
}

export default App
