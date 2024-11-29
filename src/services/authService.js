import AWS from 'aws-sdk';

// Configuración de AWS y Cognito
AWS.config.update({ region: 'us-east-1' });               // Configurar la región de AWS
const cognito = new AWS.CognitoIdentityServiceProvider(); // Crear la instancia de Cognito

// Función para registrar un usuario
const signUp = async (email, password, firstName, lastName) => {
  const params = {
    ClientId: '7mgresnoabqf0trq0cqg4gf18f',   // Reemplaza con el ClientId de tu App Client en Cognito
    Username: email,                          // El email será el "username"
    Password: password,                       // La contraseña del usuario
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
    console.error('Error al registrar usuario:', error);
    throw new Error(`Error al registrar usuario: ${error.message}`);
  }
};

// Función para autenticar al usuario
const signIn = async (email, password) => {
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',           // Tipo de flujo para autenticar usuarios
    ClientId: '7mgresnoabqf0trq0cqg4gf18f',   // Reemplaza con el ClientId de tu App Client en Cognito
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    }
  };

  try {
    const result = await cognito.initiateAuth(params).promise();
    return result; // Retorna el resultado de la autenticación (token de acceso)
  } catch (error) {
    console.error('Error al autenticar usuario:', error);
    throw new Error(`Error al autenticar usuario: ${error.message}`);
  }
};

// Función para confirmar al usuario usando el código de confirmación enviado por email
const confirmUser = async (email, confirmationCode) => {
  const params = {
    ClientId: '7mgresnoabqf0trq0cqg4gf18f',   // Reemplaza con el ClientId de tu App Client en Cognito
    Username: email,                          // El email del usuario
    ConfirmationCode: confirmationCode,       // El código de confirmación recibido por correo
  };

  try {
    const result = await cognito.confirmSignUp(params).promise();
    return result; // Retorna el resultado de la confirmación
  } catch (error) {
    console.error('Error al confirmar usuario:', error);
    throw new Error(`Error al confirmar usuario: ${error.message}`);
  }
};

// Función para iniciar el flujo de cambio de contraseña
const changePassword = async (accessToken, previousPassword, proposedPassword) => {
  const params = {
    AccessToken: accessToken,             // El Access Token del usuario autenticado
    PreviousPassword: previousPassword,   // La contraseña actual del usuario
    ProposedPassword: proposedPassword,   // La nueva contraseña
  };

  try {
    const result = await cognito.changePassword(params).promise();
    return result;
  } catch (error) {
    throw new Error(`Error al cambiar la contraseña: ${error.message}`);
  }
};

// Función para iniciar el flujo de recuperación de contraseña
const forgotPassword = async (email) => {
  const params = {
    ClientId: '7mgresnoabqf0trq0cqg4gf18f', // ID de tu App Client de Cognito
    Username: email,                        // El email del usuario
  };

  try {
    const result = await cognito.forgotPassword(params).promise();
    return result; // Retorna el resultado del inicio de recuperación de contraseña
  } catch (error) {
    throw new Error(`Error al iniciar recuperación de contraseña: ${error.message}`);
  }
};

// Función para confirmar la nueva contraseña
const confirmForgotPassword = async (email, confirmationCode, newPassword) => {
  const params = {
    ClientId: '7mgresnoabqf0trq0cqg4gf18f',   // ID de tu App Client de Cognito
    Username: email,                          // El email del usuario
    ConfirmationCode: confirmationCode,       // El código de verificación recibido
    Password: newPassword,                    // Nueva contraseña del usuario
  };

  try {
    const result = await cognito.confirmForgotPassword(params).promise();
    return result; // Retorna el resultado de la confirmación de la nueva contraseña
  } catch (error) {
    throw new Error(`Error al confirmar la nueva contraseña: ${error.message}`);
  }
};

export { signUp, signIn, confirmUser, changePassword, forgotPassword, confirmForgotPassword };  // Exportar las funciones para su uso en otras partes
