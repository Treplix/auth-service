// /src/controllers/authController.js
const authService = require('../services/authService');

// Controlador para registrar al usuario
const registerUser = async (event) => {
  const { email, password, firstName, lastName } = JSON.parse(event.body);  // Usamos JSON.parse() para obtener los datos

  try {
    const result = await authService.signUp(email, password, firstName, lastName);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuario registrado exitosamente', result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};

// Controlador para autenticar al usuario (login)
const loginUser = async (event) => {
  const { email, password } = JSON.parse(event.body);

  try {
    const result = await authService.signIn(email, password);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuario autenticado exitosamente', result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message })
    };
  }
};

// Controlador para confirmar al usuario
const confirmUser = async (event) => {
  const { email, confirmationCode } = JSON.parse(event.body);

  try {
    const result = await authService.confirmUser(email, confirmationCode);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Usuario confirmado exitosamente', result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error al confirmar usuario: ${error.message}` })
    };
  }
};

module.exports = {
  registerUser,
  loginUser,
  confirmUser
};
