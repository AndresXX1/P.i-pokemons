import React, { useState } from "react";
import validacion from "./validacion.js";
import styles from "./form.css"; // Asegúrate de que la ruta sea correcta

export default function Form({ onSubmit, history }) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [isFieldsValid, setIsFieldsValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const validationErrors = validacion({ ...userData, [name]: value });

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));

    setErrors(validationErrors);

    setIsFieldsValid(Object.values(validationErrors).every((error) => !error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
    // Redirige a la página de inicio después de enviar el formulario
    history.push("/home");
  };

  return (
    <div className="dataContainer" style={{ display: 'flex', justifyContent: 'center' }}>
  
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input
  type="text"
  name="username"
  value={userData.username}
  onChange={handleInputChange}
  autoComplete="off"  
  className={
    userData.username && errors.username ? styles.error : styles.valid
  }
/>
        {userData.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}
        <br />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          className={
            userData.password && errors.password ? styles.error : styles.valid
          }
        />
        {userData.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <hr />
        <button type="submit">LogIn</button>
      </form>
  
      <div
        className={`termsContainer ${
          isFieldsValid ? styles.termsValid : styles.termsInvalid
        }`}
      >
        <p className="texto">
          ¡Embárcate en una emocionante aventura en el multiverso Pokémon! Conoce a Ashh, un intrépido entrenador Pokémon, y a su compañero Pikachu, un Pokémon con un sentido único de la diversión. Explora episodios llenos de batallas épicas, personajes extraordinarios y risas contagiosas.
        </p>
        <p>
          En nuestra página, descubrirás noticias exclusivas, contenido detrás de escena y la oportunidad de conectarte con otros entrenadores Pokémon. Explora detalles de los episodios, mira adelantos de la nueva temporada y sumérgete en el vasto universo Pokémon como nunca antes. Únete a la diversión, explora los misterios de cada región y mantente al tanto de todas las novedades en nuestra página oficial. ¡La emoción Pokémon está a solo un clic de distancia!
        </p>
      </div>
    </div>
  );
}