const validation = (input, existingNames) => {
  let errors = {};
  
  let noEmpty = /\S+/;
  let validateName = /^[a-zA-ZñÑ]*$/ && /^[a-zA-Z0-9_-]{3,20}$/;
  let validateNum = /^\d+$/;
  let validateUrl = /^(ftp|http|https):\/\/[^\s/$.?#].[^\s]*$/;

  if (Array.isArray(existingNames) && existingNames.some((name) => name.toLowerCase() === input.name.toLowerCase())) {
    errors.name = "Este nombre ya está en uso. Por favor, elige otro.";
  } else if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3) {
    errors.name = "Nombre necesario. Mayor de 3 letras y único";
  }

  if (!validateNum.test(input.hp) || parseInt(input.hp) < 1 || parseInt(input.hp) > 999) {
    errors.hp = "Ingrese un HP entre 1 y 999";
  }

  if (!validateUrl.test(input.sprites)) {
    errors.sprites = "URL inválida o no cumple con el patrón requerido";
  }

  if (!validateNum.test(input.attack) || parseInt(input.attack) < 1 || parseInt(input.attack) > 999) {
    errors.attack = "Ingrese un Attack entre 1 y 999";
  }

  if (!validateNum.test(input.defense) || parseInt(input.defense) < 1 || parseInt(input.defense) > 999) {
    errors.defense = "Ingrese un Defense entre 1 y 999";
  }

  if (!validateNum.test(input.speed) || parseInt(input.speed) < 1 || parseInt(input.speed) > 999) {
    errors.speed = "Ingrese un Speed entre 1 y 999";
  }

  if (!validateNum.test(input.height) || parseInt(input.height) < 1 || parseInt(input.height) > 999) {
    errors.height = "Ingrese un Height entre 1 y 999";
  }

  if (!validateNum.test(input.weight) || parseInt(input.weight) < 1 || parseInt(input.weight) > 9999) {
    errors.weight = "Ingrese un Weight entre 1 y 9999";
  }

  return errors;
};

export default validation;