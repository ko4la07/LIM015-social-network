// Este es el punto de entrada de tu aplicacion
import { router } from './router/index.routes.js';

const init = () => {
// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyAMDLCdM0Co5r2KQuPGFGsRr0rfQXYhFwg',
    authDomain: 'code-girls-laboratoria.firebaseapp.com',
    projectId: 'code-girls-laboratoria',
    storageBucket: 'code-girls-laboratoria.appspot.com',
    messagingSenderId: '867416364381',
    appId: '1:867416364381:web:943663b57ef7fc0bf104b4',
    measurementId: 'G-SQWJG6X2L0',
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Devuelve la propiedad hash (ejem: #home)
  router(window.location.hash);
  window.addEventListener('hashchange', () => {
    // hashchange-> se ejecuta cuando el fragmento identificador de la URL ha cambiado (ejem: #home)
    router(window.location.hash);
  });
};

// load-> se dispara cuando un recurso y sus recursos dependientes han terminado de cargar
window.addEventListener('load', init);
