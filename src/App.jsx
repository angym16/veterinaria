import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"
import Img from "./img/1234.jpg"

//Props ->Propiedades - para pasar variables o funciones de otros componentes
//Ejemplo - <Header nombreProp= {datos o Funciones}/>

function App() {

  const [ingresado, setIngresado] = useState(false);

  const [pacientes, setPacientes] = useState(() =>
    JSON.parse(localStorage.getItem('pacientes')) || []);
    const[paciente, setPaciente]= useState({});


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
        
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-teal-200 rounded-full opacity-10"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-cyan-300 rounded-full opacity-10"></div>
        
        <div className="relative z-10">
          <img
            src={Img} 
            alt="Imagen"
            className="w-80 h-80 mb-8 object-cover rounded-full border-4 border-white shadow-lg" 
          />
        </div>

        <button
          onClick={() => setIngresado(true)}
          className="relative z-10 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-7 rounded-lg shadow-md transition-all duration-300"
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
        className="relative z-10 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-bold py-4 px-7 rounded-lg shadow-md transition-all duration-300"
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
