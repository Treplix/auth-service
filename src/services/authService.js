// /src/services/authService.js
const AWS = require('aws-sdk');

// Configurar Cognito con AWS SDK
AWS.config.update({ region: 'us-east-1' });
const cognito = new AWS.CognitoIdentityServiceProvider();

// Función para registrar al usuario
const signUp = async (email, password, firstName, lastName) => {
  const params = {
    ClientId: 'YOUR_APP_CLIENT_ID',  // ID de tu App Client de Cognito
    Username: email,                 // El email será el "username"
    Password: password,              // La contraseña del usuario
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'given_name', Value: firstName },
      { Name: 'family_name', Value: lastName },
    ]
  };

  try {
    const result = await cognito.signUp(params).promise();
    return result; // Retorna el resultado de la creación del usuario
  } catch (error) {
    throw new Error(`Error al registrar usuario: ${error.message}`);
  }
};

// Función para autenticar al usuario
const signIn = async (email, password) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: 'YOUR_APP_CLIENT_ID',
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    }
  };

  try {
    const result = await cognito.initiateAuth(params).promise();
    return result; // Retorna el resultado de la autenticación
  } catch (error) {
    throw new Error(`Error al autenticar usuario: ${error.message}`);
  }
};

// Función para confirmar al usuario usando el código recibido por email
const confirmUser = async (email, confirmationCode) => {
  const params = {
    ClientId: 'YOUR_APP_CLIENT_ID',    // Tu ID de App Client de Cognito
    Username: email,                   // El email del usuario
    ConfirmationCode: confirmationCode, // El código de confirmación recibido por correo
  };

  try {
    const result = await cognito.confirmSignUp(params).promise();
    return result; // Retorna el resultado de la confirmación
  } catch (error) {
    throw new Error(`Error al confirmar usuario: ${error.message}`);
  }
};

module.exports = {
  signUp,
  signIn,
  confirmUser
};
