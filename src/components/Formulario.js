import React, {Fragment, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    // State para mostrar el error de la validación
    const [error, actualizarError] = useState(false);

    //función para leer datos que escribe el usuario
    //e: es el evento que recibe(onChange)
    //con .target puedo acceder a los input(value,name...)
    // tengo que hacer una copia del state ...cita para no perder los campos que voy escribiendo en los input
    const actualizarState = (e) =>{
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value
        })
    } 

    //Extraer los valores
    //Y se recomienda que se agreguen en el "value" de cada input para poder resetear los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;


    // Cuando el usuario presiona agregar cita
    const submitCita = (e) => {
        e.preventDefault();

        // Validar
        // Siempre en la validación hay que colocar un return para que no se continue ejecutando el código
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' ||
        sintomas.trim() === ''){
            actualizarError(true);
            return;
        }

        // Eliminar el mensaje previo
        actualizarError(false);

        // Asignar un ID
        cita.id = uuidv4();

        // Crear la cita
        crearCita(cita);

        // Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }
    return (
        <Fragment>
            <h2>Crear Cita </h2>

            {error ?<p className="alerta-error">Todos los malditos campos son obligatorios</p> : null}

            <form 
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                
                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                
                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />    

                <label>Síntomas</label>
                <textarea
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                > </textarea>

                <button
                type="submit"
                className="u-full-width button-primary">
                Agregar Cita</button>

            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
    
}



export default Formulario;
