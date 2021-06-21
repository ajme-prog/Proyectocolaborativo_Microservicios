import { useForm } from 'hooks/useForm';
import React from 'react'
import { SolicitarLibro } from 'services/Libros';
import Swal from 'sweetalert2'

export const SolicitudCard = () => {
    const [ formValues, handleInputChange, reset, handleFilesChange ] = useForm({
        nombre:'',
        autor:'',
        fecha:'',
        pdf:''
    });
    const { nombre,autor,fecha,pdf } = formValues;


    const handleCreate =()=>{
        if(isFormValid()){
            SolicitarLibro(nombre,autor,fecha,pdf)
                .then(({status,mensaje})=>{
                    if(status===200){
                        Swal.fire('Satisfactorio','Solicitud generada correctamente','success')
                        reset();
                    }else{
                        Swal.fire('Error','No se pudo generar la solicitud','error');
                    }
                });
        }
    }

    const isFormValid= ()=>{
        if(nombre.trim().length ===0){
            Swal.fire('Error','El nombre no debe estar vacío','error')
            return false;
        }else if(autor.trim().length ===0){
            Swal.fire('Error','El autor no debe estar vacío','error')
            return false;
        }else if(fecha.trim().length ===0){
            Swal.fire('Error','La fecha no debe estar vacía','error')
            return false;
        }

        return true;
    }


    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Crear Libro</h6>
                        <button
                            className="bg-amber-500 text-white active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={handleCreate}
                        >
                            Enviar solicitud
                        </button>
                    </div>

                </div>

                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Datos del libro a solicitar
                        </h6>
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={nombre}
                                        name="nombre"
                                        placeholder="Nombre del libro a solicitar"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Autor
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={autor}
                                        name="autor"
                                        placeholder="Autor del libro a solicitar"
                                        autoComplete="off"
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Fecha
                                    </label>
                                    <input
                                        type="date"
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        value={fecha}
                                        name="fecha"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4 justify-center">
                                <div className="relative w-full mb-3 justify-center">
                                    <label
                                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        PDF
                                    </label>
                                    <hr></hr>

                                    <input
                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                        type="file"
                                        name="pdf"
                                        onChange={handleFilesChange}
                                    />
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}
