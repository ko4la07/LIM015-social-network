export const constantes = {
  URL_LOGIN: '#/login',
  URL_HOME: '#/home',
  URL_NOTIF: '#/notifications',
  URL_PROFILE: '#/profile',
  TABLA_USUARIO: 'users',
  PHOTO_USER: 'https://firebasestorage.googleapis.com/v0/b/code-girls-laboratoria.appspot.com/o/ProfileImages%2Fprofile.jpg?alt=media&token=83493742-affd-4c92-b482-e69a3bc50222',
};

/* Recibe un url() y establece la propiedad hash */
export const redirect = (url) => {
  // eje: window.location.hash = '#/home'
  window.location.hash = url;
};
