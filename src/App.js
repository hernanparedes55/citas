import React, {Fragment, useState, useEffect} from "react";
import Cita from "./components/Cita";
import Formulario from "./components/Formulario";



function App() {

  // Citas en local storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglos de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
      
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);



  // Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    
    console.log('Documento listo o algo paso con las citas');
  },[citas]);

  // Función que tome las citas actuales y agregue la nueva
  const crearCita = (cita) => {
    guardarCitas([...citas, cita])
  }

  // Función que elimina una cita por su id
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevasCitas);
  }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas';

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
                <Formulario
                  crearCita={crearCita}
                />
            </div>
            <div className="one-half column">
                <h2>{titulo}</h2>
                {citas.map(cita => (
                  <Cita
                  key={cita.id}
                    cita={cita}
                    eliminarCita={eliminarCita}
                  />
                ))}
              </div>
          </div>
        </div>


    </Fragment>
  );
}

export default App;
