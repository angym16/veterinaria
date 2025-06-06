//rfce para mas rapido lo auto completa y hace la funcion
//El estado de la aplicacion 'Una variable con informacion del aplicativo'
import { useState , useEffect} from 'react';
import Error from './Error';
import useSetFoto from "../hooks/useSetFoto";

/*useEffect 
  import{useEffect} from 'react';

  useEffect( () =>{
    console.log('El componente esta listo');
    }, [])
*/
/* const [cliente, setCliente] = useState({});
   const [total setTotal] = useState(0);
   const [cliente, setCliente] = useState([]);
   const [modal, setModal] = useState(false);
   */

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [errorCampos, setErrorCampos] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);


  // Hook personalizado para manejar foto
  const { foto, setFoto, handleChangeFoto, limpiarFoto, fotoNombre, setFotoNombre,} = useSetFoto();

  useEffect(() => {
  if (Object.keys(paciente).length > 0) {
    setNombre(paciente.nombre);
    setPropietario(paciente.propietario);
    setEmail(paciente.email);
    setFecha(paciente.fecha);
    setSintomas(paciente.sintomas);
    setFoto(paciente.foto || '');
  }
}, [paciente]);


  const generarId = () => {
    const random = Math.random().toString(18).substring(2);
    const fecha = Date.now().toString(17)

    return random + fecha
  }


  const handleSumit =(e)=>{
    e.preventDefault();

    //Validacion del Formulario

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setErrorCampos(true);
      setErrorEmail(false);
      setTimeout(() => setErrorCampos(false), 2000);
      return;
      
    }

    if (!email.includes('@') || !email.includes('.')) {
      setErrorCampos(false);
      setErrorEmail(true);
      setTimeout(() => setErrorEmail(false), 2000);
      return;
    }
    setErrorCampos(false);
    setErrorEmail(false);

    //objeto Paciente
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas,
      foto,
      id: generarId()
    }

    if (paciente.id) {
      objetoPaciente.id=paciente.id
      //Editando Registro
      console.log(objetoPaciente)
      console.log(paciente)
      
      //Detecta que es el mismo id
      const pacientesActualizados = pacientes.map ( pacienteState => pacienteState.id === 
        paciente.id ? objetoPaciente : pacienteState)

        setPacientes(pacientesActualizados)
        setPaciente({})
    }else{
      //Nuevo registro
      objetoPaciente.id=generarId()
      setPacientes([...pacientes, objetoPaciente])
    }
    // console.log(objetoPaciente)
    // setPacientes([...pacientes, objetoPaciente])

    //Reiniciar el formulario

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
    setFotoNombre('');
  }

  return (
    <div className="md:w-1/2 lg:w-3/4">
      <div className='bg-white shadow-xl rounded-2xl p-8'>
        <h2 className="font-black text-3xl text-center text-gray-700 mb-6">Seguimiento Pacientes</h2>
        <p className="text-lg mt-5 text-center mb-10">
          Añade Paciente y {' '}
          <span className="text-cyan-800 font-bold">Administralos</span>
        </p>
        <form 
          onSubmit={handleSumit}
          className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        
          {errorCampos && (
            <Error>
              <p>Todos los campos son obligatorios</p>
            </Error>
          )}

          {errorEmail && (
            <Error>
              <p>El email ingresado no es válido</p>
            </Error>
         )}

          <div className="mt-5">
            <label htmlFor="mascota" className="block font-bold uppercase text-sm text-gray-700 mb-1">Nombre Macota</label>

            <input 
            id="mascota"
            type="text" 
            placeholder="Nombre de la Mascota"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="propietario" className="block font-bold uppercase text-sm text-gray-700 mb-1">Nombre Propietario</label>

            <input 
            id="propietario"
            type="text" 
            placeholder="Nombre del Propietario"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="email" className="block font-bold uppercase text-sm text-gray-700 mb-1">Email</label>

            <input 
            id="email"
            type="text" 
            placeholder="Email de Contacto Propietario"
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="alta" className="block font-bold uppercase text-sm text-gray-700 mb-1">Alta</label>

            <input 
            id="alta"
            type="date" 
            className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label htmlFor="sintomas" className="block font-bold uppercase text-sm text-gray-700 mb-1">Síntomas</label>
            <textarea 
              id="sintomas"
              className="border-2 w-full mt-2 placeholder-gray-400 rounded-md" 
              placeholder="Describe los Síntomas"
              value={sintomas}
              onChange={(e) => setSintomas(e.target.value)}
            />
          </div>

          {!paciente.id  && <div className="mt-5 h-[30%]">
            <label htmlFor="foto" className="block font-bold uppercase text-sm text-gray-700 mb-1">
              Foto Mascota:
              <span className="text-gray-500 text-xs bg-slate-200/20">{fotoNombre}</span>
            </label>
            <input
              id="foto"
              type="file"
              accept="image/*"
              className="hidden border-2 w-full h-full mt-2 placeholder-gray-400 rounded-md"
              onChange={handleChangeFoto}
            />
          </div>}
          
          <input 
            type="submit"
            className="bg-cyan-600 w-full p-3 text-white uppercase font-bold hover:bg-cyan-700 cursor-pointer transition-colors mt-5 rounded-md"
            value={ paciente.id ? 'Editar Paciente' : 'Agregar paciente'}
          />
          {paciente.id && (
            <button
              type="button"
              className="bg-gray-500 w-full p-3 text-white uppercase font-bold hover:bg-gray-500 cursor-pointer transition-colors mt-3 rounded-md"
              onClick={() => {
                // Limpiar el paciente seleccionado y reiniciar el formulario
                setPaciente({});
                setNombre('');
                setPropietario('');
                setEmail('');
                setFecha('');
                setSintomas('');
                limpiarFoto();
              }}>
              Volver a Crear Nuevo Paciente
            </button>
        )}
        </form>
      </div>
    </div>
  )
}

export default Formulario


