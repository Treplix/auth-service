// src/index.js
import middy from '@middy/core';  // Importar el middleware Middy
import { registerUser, loginUser, confirmUser, changePassword, forgotPassword, confirmForgotPassword } from './controllers/authController.js';  // Importar los controladores

// Definir el manejador principal de la función Lambda
const handlerFunction = async (event) => {
  const { httpMethod, path } = event;

  // Construir la clave de la ruta
  const routeKey = `${httpMethod.toLowerCase()} ${path}`;

  const routes = {
    'post /auth/register': registerUser,
    'post /auth/login': loginUser,
    'post /auth/confirm': confirmUser,
    'post /auth/change-password': changePassword,
    'post /auth/forgot-password': forgotPassword,
    'post /auth/confirm-forgot-password': confirmForgotPassword
  };

  if (routes[routeKey]) {
    return routes[routeKey](event);
  } else {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: 'Ruta no encontrada' })
    };
  }
};

// Usar Middy para envolver la función Lambda
export const handler = middy(handlerFunction); 
