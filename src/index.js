// /src/index.js
const middy = require('@middy/core');
const { registerUser, loginUser, confirmUser } = require('./controllers/authController');

// Manejador principal de la función Lambda
const handler = async (event) => {
  const { httpMethod, path } = event;

  // Construimos la clave de la ruta
  const routeKey = `${httpMethod.toLowerCase()} ${path}`;

  const routes = {
    'post /auth/register': registerUser,
    'post /auth/login': loginUser,
    'post /auth/confirm': confirmUser
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

// Usamos Middy para la función Lambda
exports.handler = middy(handler);
