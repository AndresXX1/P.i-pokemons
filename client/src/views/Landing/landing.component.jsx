import { Link, withRouter } from "react-router-dom";
import "./landing.css";
import Form from "./form";

function Landing({ history }) {
  const handleFormSubmit = (userData) => {
    // Aquí puedes manejar los datos del formulario en Landing
    console.log("Datos del formulario en Landing:", userData);
    // Puedes realizar más lógica aquí, como enviar los datos a un servidor, etc.
  };

  return (
    <div className="landing">
      <span className="Creador">By Andres Vera</span>
      <div className="pokelogo" alt="landing" />
      <div>
        {/* Aquí se invoca el componente Form y se pasa la función handleFormSubmit como prop */}
        <Form onSubmit={handleFormSubmit} history={history} />
      </div>
    </div>
  );
}
export default withRouter(Landing);