// hooks/useSetFoto.js
import { useState } from "react";

const useSetFoto = () => {
  const [foto, setFoto] = useState("");
  const [ fotoNombre, setFotoNombre ] = useState('');
  const [ show, setShow ] = useState(false);

  // Convierte archivo a base64
  const convertirBase64 = (archivo) => {
    return new Promise((resolve, reject) => {
      const lector = new FileReader();
      lector.readAsDataURL(archivo);
      lector.onload = () => resolve(lector.result);
      lector.onerror = (error) => reject(error);
    });
  };

  // Maneja cambio en input tipo file
  const handleChangeFoto = async (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      try {
        const base64 = await convertirBase64(archivo);
        setFoto(base64);
        setFotoNombre(archivo.name); 
      } catch (error) {
        console.error("Error al convertir la imagen", error);
      }
    }
  };

  // Limpia la foto
  const limpiarFoto = () => {
    setFoto("");
    setFotoNombre('');
  };

  return {
    foto,
    setFoto,
    handleChangeFoto,
    limpiarFoto,
    fotoNombre,
    setFotoNombre,
    show,
    setShow
  };
};

export default useSetFoto;
