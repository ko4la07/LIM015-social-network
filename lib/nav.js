import { cerrarSesion, checkLogin, dataUsuario } from '../firebase/firebase.js';
import { constantes, redirect } from './utilidades.js';

// Menu Principal
export const navBar = () => {
  checkLogin(); // si usuario no esta autenticado redirige a LOGIN
  dataUsuario(); // tiene la data de usuario autenticado
  const container = document.createElement('nav');

  const template = `
  <img src = 'assets/img/logoCodeGirls.svg' id = 'logo-cg'>
    <ul>
      <li>
       <a href="#" id="navNotifications"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app-indicator" viewBox="0 0 16 16">
       <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z"/>
       <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      </svg>
      </a>
      </li>
      <li>
       <a href="#" id="navHome"> Muro Principal </a>
      </li>
      <li id = 'profile-style'>
       <a href="#" id="navProfile"><span id="photoProfile"></span> Mi perfil </a>
      </li>
      <li>
       <a href="#" id="navLogout" > Salir </a>
      </li>
    </ul>
    `;

  container.innerHTML = template;

  /* Botón para Notificaciones */
  const navNotifications = container.querySelector('#navNotifications');
  navNotifications.addEventListener('click', (event) => {
    event.preventDefault();
    redirect(constantes.URL_NOTIF);
  });

  /* Botón para Muro Principal */
  const navHome = container.querySelector('#navHome');
  navHome.addEventListener('click', (event) => {
    event.preventDefault();
    redirect(constantes.URL_HOME);
  });

  /* Botón para Mi Perfil */
  const navProfile = container.querySelector('#navProfile');
  navProfile.addEventListener('click', (event) => {
    event.preventDefault();
    redirect(constantes.URL_PROFILE);
  });

  /* Botón para Cerrar Sesión */
  const navLogout = container.querySelector('#navLogout');
  navLogout.addEventListener('click', (event) => {
    event.preventDefault();
    cerrarSesion();
  });

  return container;
};

// Menu Left
export const navLeft = () => {
  const container = document.createElement('aside');
  container.className = 'aside-left';

  const template = `
      <ul>
        <li id="alia"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
          </svg>Mis aliadas</a>
        </li>
        <li id="post"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm.5 5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1zM4 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
          </svg>Mis post</a>
        </li>
        <li id="fras"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
          </svg>Mi frase favorita es:</a>
        </li>

            <div class="frase-favorita"><p class="frase">"Si se puede imaginar, se puede programar".</p></div>
      </ul>

        <div class="vertical-line-left" style="height: 100%;"></div>
  `;

  container.innerHTML = template;

  /* Botón para Aliadas */
  const navAliadas = container.querySelector('#alia');
  navAliadas.addEventListener('click', (event) => {
    event.preventDefault();
    // pintar en el container del medio central
  });

  /* Botón para Post */
  const navPost = container.querySelector('#post');
  navPost.addEventListener('click', (event) => {
    event.preventDefault();
    // pintar en el container del medio central
  });

  /* Botón para Mi Frase */
  const navPhrase = container.querySelector('#fras');
  navPhrase.addEventListener('click', (event) => {
    event.preventDefault();
    // pintar en el container del medio central
  });

  return container;
};

// Menu Right
export const navRight = () => {
  const container = document.createElement('aside');
  container.className = 'aside-right';

  const template = `
  <div class="vertical-line-right" style="height: 100%;"></div>

        <ul>
            <li><a href="#" id="navFiles"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
            </svg>Mis archivos</a></li>
            <li><a href="#" id="navEvents"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>Mis eventos</a></li>
            <li><a href="#" id="navCodes"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code" viewBox="0 0 16 16">
            <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
            </svg>
            </svg>Mis códigos</a></li>
        </ul>
  `;

  container.innerHTML = template;

  /* Botón para Archivos */
  const navFiles = container.querySelector('#navFiles');
  navFiles.addEventListener('click', (event) => {
    event.preventDefault();
    // redirect(constantes.URL_NOTIF);
  });

  /* Botón para Eventos */
  const navEvents = container.querySelector('#navEvents');
  navEvents.addEventListener('click', (event) => {
    event.preventDefault();
    // redirect(constantes.URL_HOME);
  });

  /* Botón para Mis Codigos */
  const navCodes = container.querySelector('#navCodes');
  navCodes.addEventListener('click', (event) => {
    event.preventDefault();
    // redirect(constantes.URL_PROFILE);
  });

  return container;
};
