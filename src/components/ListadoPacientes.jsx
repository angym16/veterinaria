
import Paciente from "./Paciente"

const ListadoPacientes = ({pacientes , setPaciente, eliminarPaciente}) => {

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
     
     {pacientes && pacientes.length ? 
      (
        <>
          <h2 className="font-black text-3xl text-center">Listados Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administrar tu {''}
    
            <span className="text-cyan-800 font-bold">Pacientes y Citas</span>
          </p>
    
          { pacientes.map( paciente =>( 
            <Paciente 
            key={paciente.id}
            paciente={paciente}
            setPaciente={setPaciente}
            eliminarPaciente={eliminarPaciente}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
              Comience agregando pacientes {''}
      
              <span className="text-cyan-800 font-bold">y apareceran en este lugar</span>
            </p>
        </>
      )}

     
    </div>
  )
}

export default ListadoPacientes
