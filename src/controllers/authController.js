// /src/controllers/authController.js
import * as authService from '../services/authService.js'; // Importar correctamente el servicio

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

// Controlador para iniciar el flujo de cambio de contraseña
const changePassword = async (event) => {
  const { accessToken, previousPassword, proposedPassword } = JSON.parse(event.body);

  try {
    const result = await authService.changePassword(accessToken, previousPassword, proposedPassword);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contraseña cambiada exitosamente', result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error al cambiar la contraseña: ${error.message}` })
    };
  }
};

// Controlador para iniciar el flujo de recuperación de contraseña
const forgotPassword = async (event) => {
  const { email } = JSON.parse(event.body);

  try {
    const result = await authService.forgotPassword(email);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Recuperación de contraseña iniciada', result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error al iniciar recuperación de contraseña: ${error.message}` })
    };
  }
};

// Controlador para confirmar el nuevo valor de la contraseña
const confirmForgotPassword = async (event) => {
  const { email, confirmationCode, newPassword } = JSON.parse(event.body);

  try {
    const result = await authService.confirmForgotPassword(email, confirmationCode, newPassword);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Contraseña restablecida exitosamente', result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Error al restablecer la contraseña: ${error.message}` })
    };
  }
};

export { registerUser, loginUser, confirmUser, changePassword, forgotPassword, confirmForgotPassword };  // Exportar correctamente las funciones
