/* eslint-disable object-curly-newline */
import { estaLogueado, loginConGoogle, registrarUsuario, validarLogin } from '../firebase/firebase.js';

export const login = () => {
  estaLogueado(); // si usuario esta autenticado redirige a HOME
  const containerLogin = document.createElement('section');
  containerLogin.className = 'login-content';
  const figure = document.createElement('figure');
  figure.className = 'login-left';
  const main = document.createElement('main');
  main.className = 'login-right';
  const contentFigure = `<img id="login-logoImg" src="./assets/img/logoCodeGirls.svg" alt="logo"/>
                         <img id="login-programadoraImg" src="./assets/img/ImagenCodeGirls.svg" alt="imagen de programadora"/>`;
  const contentMain = `<form id="login-form">
                        <br>
                        <h1 class="login-fontBlack">Introduce tus datos para iniciar sesión</h1>
                            <div id="msjError" class="login-mjsError"></div>
                            <input class="login-inputs inputEmail" type="email" id ="txtEmail" placeholder="Correo Electrónico" /><br/>
                            <input class="login-inputs inputPassword" type="password" id ="txtPassword" placeholder="Contraseña" /><br/>
                        <button type="submit" id="btnLoginEmail" class="login-buttons">Iniciar Sesión</button>

                        <hr id="hrContent">
                        <br>
                            <div id="msjErrorGoogle" class="login-mjsError"></div>
                        <button type="submit" id="btnLoginGoogle" class="login-buttons">Acceder con Google</button>
                        
                        <p class="login-fontBlack"><br>o crea una cuenta nueva</p>
                        <button type="submit" id="btnCreateEmail" class="login-buttons">Crear Cuenta</button>
                            <div id="modal" class="modalContainer">
                              <div class="modal-content">
                                    <span class="close">×</span>
                                    <h1 id="titleModal">Contacta con más Aliadas</h1>
                                        <div id="msjErrorModal" class="login-mjsError">advertencia de error</div>
                                        <input class="login-inputs inputName" type="text" id ="txtNameRegister" placeholder="Nombres *" /><br/>
                                        <input class="login-inputs inputLastName" type="text" id ="txtLastNameRegister" placeholder="Apellidos *" /><br/>
                                        <input class="login-inputs inputEmail" type="email" id ="txtEmailRegister" placeholder="Correo Electrónico *" /><br/>
                                        <input class="login-inputs inputPassword" type="password" id ="txtPasswordRegister" placeholder="Contraseña *" /><br/>
                                    <button  type="submit" id="btnRegister" class="login-buttons">Registrarme</button><br/>
                                    <img id="loginModal-logoImg" src="./assets/img/logoCodeGirls.svg" alt="logo">
                              </div>
                            </div>
                      </form>`;

  figure.innerHTML = contentFigure;
  main.innerHTML = contentMain;
  containerLogin.appendChild(figure);
  containerLogin.appendChild(main);

  function clearInputs() {
    containerLogin.querySelector('#txtNameRegister').value = '';
    containerLogin.querySelector('#txtLastNameRegister').value = '';
    containerLogin.querySelector('#txtEmail').value = '';
    containerLogin.querySelector('#txtPassword').value = '';
    containerLogin.querySelector('#txtEmailRegister').value = '';
    containerLogin.querySelector('#txtPasswordRegister').value = '';
    containerLogin.querySelector('#msjErrorModal').innerText = '';
    containerLogin.querySelector('#msjErrorModal').style.display = 'none';
    containerLogin.querySelector('#msjErrorGoogle').innerText = '';
    containerLogin.querySelector('#msjErrorGoogle').style.display = 'none';
    containerLogin.querySelector('#msjError').innerText = '';
    containerLogin.querySelector('#msjError').style.display = 'none';
  }
  /*
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
  // Autenticar Firebase */

  /* Constantes que contendrán a los botones */
  const btnLoginEmail = containerLogin.querySelector('#btnLoginEmail');
  const btnLoginGoogle = containerLogin.querySelector('#btnLoginGoogle');
  const btnCreateEmail = containerLogin.querySelector('#btnCreateEmail');
  const btnRegister = containerLogin.querySelector('#btnRegister');

  // Botón para Iniciar Sesión con correo
  btnLoginEmail.addEventListener('click', (event) => {
    event.preventDefault();
    containerLogin.querySelector('#msjError').innerText = '';
    containerLogin.querySelector('#msjError').style.display = 'none';
    btnLoginEmail.innerHTML = 'Espere....';
    btnLoginEmail.disabled = true;
    const txtEmail = containerLogin.querySelector('#txtEmail').value;
    const txtPassword = containerLogin.querySelector('#txtPassword').value;
    // Validar Login para Iniciar Sesión con Correo
    validarLogin(txtEmail, txtPassword);
    // clearInputs();
  });

  // Botón para Iniciar Sesión con Google
  btnLoginGoogle.addEventListener('click', (event) => {
    event.preventDefault();
    // Validar Login para Iniciar Sesión con Google
    loginConGoogle();
    clearInputs();
  });

  // Botón para mostrar el modal de Crear Cuenta
  btnCreateEmail.addEventListener('click', (event) => {
    event.preventDefault();

    if (containerLogin.querySelector('#btnCreateEmail')) {
      // Limpiar inputs y mensajes de Error
      clearInputs();

      const modal = containerLogin.querySelector('#modal');
      // Devuelve una lista de elementos que cumplen con la selección (notación como en CSS)
      const span = document.querySelectorAll('.close')[0];
      // Obtiene una HTMLCollection con los todos los elementos 'body'
      const body = document.getElementsByTagName('body')[0];

      modal.style.display = 'block';
      body.style.position = 'static';
      body.style.height = '100%';
      body.style.overflow = 'hidden';

      span.addEventListener('click', () => {
        modal.style.display = 'none';
        body.style.position = 'inherit';
        body.style.height = 'auto';
        body.style.overflow = 'visible';
      });

      window.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
          body.style.position = 'inherit';
          body.style.height = 'auto';
          body.style.overflow = 'visible';
        }
      });
    }
  });

  // Botón para Crear Cuenta con correo
  btnRegister.addEventListener('click', (event) => {
    event.preventDefault();
    const txtEmailRegister = containerLogin.querySelector('#txtEmailRegister').value;
    const txtPasswordRegister = containerLogin.querySelector('#txtPasswordRegister').value;
    const txtNameRegister = containerLogin.querySelector('#txtNameRegister').value;
    const txtLastNameRegister = containerLogin.querySelector('#txtLastNameRegister').value;
    const mjsError = containerLogin.querySelector('#msjErrorModal');
    btnRegister.innerHTML = 'Espere....';
    btnRegister.disabled = true;
    if (txtEmailRegister === '' || txtPasswordRegister === '' || txtNameRegister === '' || txtLastNameRegister === '') {
      mjsError.style.display = 'block';
      mjsError.innerText = 'Debe llenar todo los campos';
      btnRegister.innerHTML = 'Registrarme';
      btnRegister.disabled = false;
    } else {
      // Registrar correo para Iniciar Sesión con Correo
      const nuevoUsuario = {
        name: txtNameRegister,
        lastName: txtLastNameRegister,
        email: txtEmailRegister,
        password: txtPasswordRegister,
      };
      registrarUsuario(nuevoUsuario);
    }
  });

  /* const userData = auth.child('user').child(authData.uid);
      userData.set({
        email: authData.additionalUserInfo.profile.email,
        name: authData.additionalUserInfo.profile.name,
        photo: authData.additionalUserInfo.profile.picture,
      }); */

  return containerLogin;
};
