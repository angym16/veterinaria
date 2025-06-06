import React from 'react'
import useSetFoto from "../hooks/useSetFoto";

const Paciente = ({paciente, setPaciente, eliminarPaciente}) => {

  //Se define el una variable un destructor
  const{ nombre, propietario, email, fecha, sintomas, id, foto, fotoNombre } =paciente
  const handleEliminar = () =>{
    const respuesta = confirm('Deseas Eliminar este paciente')

    if (respuesta) {
      eliminarPaciente(id)
    }
  }

  return (
    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
        <p className="font-bold mb-3 text-gray-700 uppercase"> 
          Nombre: {''}
          <span className="font-normal normal-case">{nombre}</span>
        </p> 
        <p className="font-bold mb-3 text-gray-700 uppercase"> 
          Propietario: {''}
          <span className="font-normal normal-case">{propietario}</span>
        </p> 
        <p className="font-bold mb-3 text-gray-700 uppercase"> 
          Email: {''}
          <span className="font-normal normal-case">{email}</span>
        </p> 
        <p className="font-bold mb-3 text-gray-700 uppercase"> 
          Fecha Alta: {''}
          <span className="font-normal normal-case">{fecha}</span>
        </p> 
        <p className="font-bold mb-3 text-gray-700 uppercase"> 
          Sintomas: {''}
          <span className="font-normal normal-case">{sintomas}</span>
        </p> 
        {foto && (
          <div className="mt-5">
            <img 
              src={foto}
              alt={`Foto de ${nombre}`}
              className="w-40 h-40 object-cover rounded-full mx-auto"
            />
          </div>
        )}
        <div className='flex justify-between mt-10'>
          <button
          type="button"
          className='py-2 px-10 bg-cyan-600 hover:bg-cyan-700 text-white font-bold uppercase rounded-lg'
          onClick={() => setPaciente(paciente)}
          >Editar</button>
       
          <button
          type="button"
          className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg'
          onClick={handleEliminar}
          
          >Eliminar</button>
        </div>
      </div>
      
  )
}

export default Paciente