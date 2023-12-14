import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postedPokemon } from "../../redux/actions/actions";
import validation from "../components/Validation/validation"
import "./create.css"
import { Link } from "react-router-dom";
import "./volumenBar"
import VolumeBar from "./volumenBar";
import Nivel from "./nivel";

const PostPokemon = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const types = useSelector((state) => state.types);
  const [volume, setVolume] = useState([
    { attribute: "hp", value: 0, stars: false },
    { attribute: "attack", value: 0, stars: false },
    { attribute: "defense", value: 0, stars: false },
    { attribute: "speed", value: 0, stars: false },
    { attribute: "height", value: 0, stars: false },
    { attribute: "weight", value: 0, stars: false },
  ]);
  const [input, setInput] = useState({
    name: "",
    sprites: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });
  const [imageUrl, setImageUrl] = useState("");
  const [promedio, setPromedio] = useState(0);

  useEffect(() => {
    const values = volume.map((item) => item.value);
    const sum = values.reduce((acc, value) => acc + value, 0);
    const average = values.length > 0 ? sum / values.length : 0;
    setPromedio(Math.round(average));
  }, [volume]);

  const updateVolume = (property, newValue) => {
    setVolume((prevVolume) => {
      const updatedVolume = prevVolume.map((item) => ({
        ...item,
        value: property === item.attribute ? Math.round(newValue) : item.value,
        stars: Math.round(newValue) > promedio,
      }));
      return updatedVolume;
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'name' || name === 'sprites') {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
      if (name === 'sprites') {
        setImageUrl(value);
      }
    } else {
      const selectedType = Number(value);
      setInput((prevInput) => ({
        ...prevInput,
        [name]: Number(value),
      }));
      setVolume((prevVolume) =>
        prevVolume.map((item) => ({
          ...item,
          value: name === item.attribute ? Math.round(value) : item.value,
          stars: Math.round(value) > promedio,
        }))
      );
    }
  };

  const handleBlur = () => {
    const newErrors = validation(input);
    setErrors(newErrors);
  };

  const getSelectedTypeNames = () => {
    return types
      .filter((type) => input.types.includes(type.id))
      .map((selectedType) => selectedType.name);
  };

  const handleCheckboxChange = (event) => {
    const selectedType = Number(event.target.value);
    if (input.types.includes(selectedType)) {
      setInput({
        ...input,
        types: input.types.filter((type) => type !== selectedType),
      });
    } else {
      setInput({
        ...input,
        types: [...input.types, selectedType],
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !errors.name &&
      !errors.hp &&
      !errors.attack &&
      !errors.defense &&
      !errors.speed &&
      !errors.height &&
      !errors.weight &&
      !errors.sprites &&
      input.types.length >= 2
    ) {
      try {
        dispatch(postedPokemon(input));
        setMessage("El Pokémon se creó con éxito.");

        // Limpiar el formulario después de la creación exitosa
        setInput({
          name: "",
          sprites: "",
          hp: "",
          attack: "",
          defense: "",
          speed: "",
          height: "",
          weight: "",
          types: [],
        });
        setImageUrl(""); // Limpiar la URL de la imagen
        setVolume([...volume].map((item) => ({ ...item, value: 0 }))); // Restablecer valores de volumen
      } catch (error) {
        console.error("Error al crear el Pokémon:", error);
        setMessage(
          "Error al crear el Pokémon. Por favor, inténtalo de nuevo."
        );
      }
    } else {
      setMessage("Por favor, completa el formulario correctamente.");
    }
  };



return (
  <div>
    <div className='container'>
    <div className="form-and-preview-container">
      <form className="form-container" onSubmit={e => handleSubmit(e)}>
        <div>
          <label className="form-label">Name</label>
          <input type='text' value={input.name} name='name' placeholder='name...' onChange={e => handleChange(e)} onBlur={handleBlur} className="form-input" />
          <p className="error-message">{errors.name}</p>

          <label className="form-label">Sprites</label>
          <input type="text" value={input.sprites} name='sprites' placeholder="sprites..." onChange={e => handleChange(e)} onBlur={handleBlur} className="form-input" />
          <p className="error-message">{errors.sprites}</p>

          <label className="form-label">Hp</label>
          <input type="number" value={input.hp} name='hp' placeholder="hp..." onChange={e => handleChange(e)} onBlur={handleBlur} className="form-input" />
          <p className="error-message">{errors.hp}</p>

          
        <label className="form-label">Attack</label>
        <input type="number" value={input.attack} name='attack' placeholder="attack..." onChange={e => { handleChange(e) }} onBlur={handleBlur} className="form-input" />
        <p className="error-message">{errors.attack}</p>

        <label className="form-label">Defense</label>
        <input type="number" value={input.defense} name='defense' placeholder="defense..." onChange={e => { handleChange(e) }} onBlur={handleBlur} className="form-input" />
        <p className="error-message">{errors.defense}</p>

        <label className="form-label">Speed</label>
        <input type="number" value={input.speed} name='speed' placeholder="speed..." onChange={e => { handleChange(e) }} onBlur={handleBlur} className="form-input" />
        <p className="error-message">{errors.speed}</p>

        <label className="form-label">Height</label>
        <input type="number" value={input.height} name='height' placeholder="height..." onChange={e => { handleChange(e) }} onBlur={handleBlur} className="form-input" />
        <p className="error-message">{errors.height}</p>

        <label className="form-label">Weight</label>
        <input type="number" value={input.weight} name='weight' placeholder="weight..." onChange={e => { handleChange(e) }} onBlur={handleBlur} className="form-input" />
        <p className="error-message">{errors.weight}</p>


        </div>
        <div className="checkbox-container">
          {types?.map((type) => (
            <label className="checkbox-label" key={type.id}>
              <input
                type="checkbox"
                className="checkbox-input"
                value={type.id}
                checked={input.types.includes(type.id)}
                onChange={handleCheckboxChange}
              />
              {type.name}
            </label>
          ))}
          {input.types.length < 2 && (
            <p className="error-message">Please select at least 2 types.</p>
          )}
        </div>
        <button type="submit" className="submit-button">Create!</button>
        

          {message && (
          <div className={message.includes("éxito") ? "success-message" : "error-message"}>
            {message}
          </div>
            )}

        <div>
          <Link to="/home">
            <button className="submit-button"> Volver a Home </button>
          </Link>
        </div>

        <div>
          <Link to="/home/:id">
            <button className="submit-button"> Detail </button>
          </Link>
        </div>

        </form>

        <div className="preview-container">
      <div className="nombre">
        <h3>{input.name ? input.name : 'Nombre...'}</h3>
      </div>
      <div className="image-preview">
        {imageUrl && <img src={imageUrl} alt="Preview" className="preview-image" />}
      </div>
      
      <p className="lvl"> LvL:
        <Nivel volumeValues={volume} />
        </p>
      

      <p className="feactures-container">
        <p className="titulo">Caracteristicas</p>

        <div className="lado">HP</div>
        <VolumeBar
           value={volume.find((item) => item.attribute === 'hp').value}
           onChange={(newValue) => {
             updateVolume('hp', newValue);
             handleChange({
               target: { name: 'hp', value: newValue },
             });
           }}
          ></VolumeBar>
          
          
          <div className="lado">Attack</div>
        <VolumeBar
           value={volume.find((item) => item.attribute === 'attack').value}
           onChange={(newValue) => {
             updateVolume('attack', newValue);
             handleChange({
               target: { name: 'attack', value: newValue },
             });
           }}
          ></VolumeBar>

        <div className="lado">Defense</div>
        <VolumeBar
           value={volume.find((item) => item.attribute === 'defense').value}
           onChange={(newValue) => {
             updateVolume('defense', newValue);
             handleChange({
               target: { name: 'defense', value: newValue },
             });
           }}
          ></VolumeBar>
          
          <div className="lado">Speed</div>
        <VolumeBar
           value={volume.find((item) => item.attribute === 'speed').value}
           onChange={(newValue) => {
             updateVolume('speed', newValue);
             handleChange({
               target: { name: 'speed', value: newValue },
             });
           }}
          ></VolumeBar>

        <div className="lado">height</div>
        <VolumeBar
           value={volume.find((item) => item.attribute === 'height').value}
           onChange={(newValue) => {
             updateVolume('height', newValue);
             handleChange({
               target: { name: 'height', value: newValue },
             });
           }}
          ></VolumeBar>

        <div className="lado">Weigth</div>
        <VolumeBar
           value={volume.find((item) => item.attribute === 'weight').value}
           onChange={(newValue) => {
             updateVolume('weight', newValue);
             handleChange({
               target: { name: 'weight', value: newValue },
             });
           }}
          ></VolumeBar>
          </p>

 <div className="tipos">
            <p className="titulo">tipos:</p>
       <p> {getSelectedTypeNames().join(', ')}</p>
          </div>
           </div>

           </div>
           </div>
        
           </div>
 
      
);

} 


export default PostPokemon