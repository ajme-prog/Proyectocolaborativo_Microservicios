import { useState } from "react"

//Custom Hook que se va a encargar de manejar los formularios. Podemos agregarle cualquier cantidad de logica. 
export const useForm = (initialState={}) => {
    const [values, setValues] = useState(initialState); //recibe el nombre de los campos que requiere

    const reset = ()=>{
        setValues(initialState);
    }

    const handleInputChange = ({target}) =>{

        setValues({
            ...values,
            [target.name]:target.value
        }); // lo de [target.name] se llaman computed properties, así se maneja cuando se quiere agregar una nueva propiedad con el valor de un objeto.
    }

    const handleFilesChange = ({target}) =>{
        
        setValues({
            ...values,
            [target.name]:target.files[0]
        }); 
    }

    return [values, handleInputChange, reset, handleFilesChange];
}