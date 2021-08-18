import { constantes, redirect } from './utilidades.js';

export const notFound = () => {
  const container = document.createElement('div');
  container.className = 'container-404';
  const notas = `
      <img id="programadora-img" src="./assets/img/ImagenCodeGirls.svg" alt="imagen de programadora"/>
      <div id = 'error-404'>
      <h2>error 404</h2>
      <p>Página no encontrada</p>
      <button id = 'home-return'> Regresar </button>
      </div>
    `;
  container.innerHTML = notas;

  const btnHome = container.querySelector('#home-return');
  btnHome.addEventListener('click', () => {
    redirect(constantes.URL_LOGIN);
  });

  return container;
};
