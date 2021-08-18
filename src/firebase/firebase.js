import { constantes, redirect } from '../lib/utilidades.js';

// Autenticar firebase
function logueo() {
  return firebase.auth();
}

// llamando a firestore
function dataBase() {
  return firebase.firestore();
}

// Solo sirve para login.js
export const estaLogueado = () => {
  // onAuthStateChanged =>Listar para estados de cambio en la autenticación
  logueo().onAuthStateChanged((user) => {
    if (user) {
      // user = true => usuario está autenticado
      // console.log('usuario autenticado');
      // constantes.URL_HOME=> '#/home' = url
      // window.location.hash(url) => redirect(url))
      redirect(constantes.URL_HOME);
    }
  });
};

export const dataUsuario = () => {
  logueo().onAuthStateChanged((user) => {
    // si usuario existe (logueado)
    if (user) {
      const idUser = user.uid;
      // recorre coleccion USER de firestore donde idUser(usuario logueado) = uid(usuario en USER)
      dataBase().collection(constantes.TABLA_USUARIO).where('uid', '==', idUser).get()
        .then((data) => {
          data.forEach((hijo) => {
            // console.log(hijo.data());
            const datosUser = hijo.data();
            // console.log(datosUser.fullName);
            document.querySelector('#photoProfile').innerHTML = `<img src= '${datosUser.photo}' />`;
          });
        });
    }
  });
};

// Para todos los demás casos excepto login.js
export const checkLogin = () => {
  // onAuthStateChanged =>Listar para estados de cambio en la autenticación
  logueo().onAuthStateChanged((user) => {
    if (!user) {
      // user = false => usuario no está autenticado
      // console.log('usuario NO autenticado');
      // constantes.URL_HOME=> '#/home' = url
      // window.location.hash(url) => redirect(url))
      redirect(constantes.URL_LOGIN);
    }
  });
};

// Cerrar Sesión
export const cerrarSesion = () => {
  logueo().signOut().then((/* userCredential */) => {
  /*  console.log('se cerró sesión');
    console.log(userCredential); */
    // constantes.URL_HOME=> '#/home' = url
    // window.location.hash(url) => redirect(url))
    redirect(constantes.URL_LOGIN);
  });
};

// const auth = logueo();

// Validar Login para Iniciar Sesión con Correo
export const validarLogin = (email, password) => {
  logueo()
    .signInWithEmailAndPassword(email, password)
    .then((/* userCredential */) => {
      // const user = userCredential.user; // obtener el actual user
      /*  console.log('usuario logueado correo');
      console.log(userCredential); */
      // constantes.URL_HOME=> '#/home' = url
      // window.location.hash(url) => redirect(url))
      redirect(constantes.URL_HOME);
    })
    .catch((error) => {
      document.querySelector('#btnLoginEmail').innerHTML = 'Iniciar Sesión';
      document.querySelector('#btnLoginEmail').disabled = false;
      const errorCode = error.code;
      // console.log(errorCode);
      const errorMessage = error.message;
      // console.log(errorMessage);
      const content = document.querySelector('#msjError');
      content.style.display = 'block';
      switch (errorCode) {
        case 'auth/wrong-password':
          content.innerText = 'Usuario y/o contraseña incorrecta.';
          break;
        case 'auth/invalid-email':
          content.innerText = 'La dirección de correo electrónico no es válida.';
          break;
        case 'auth/user-not-found':
          content.innerText = 'Usuario y/o contraseña incorrecta.';
          break;
        case 'auth/too-many-requests':
          content.innerText = 'Superó su numero de intentos permitidos, vuelva a intentarlo luego';
          break;
        default:
          content.innerText = errorMessage;
      }
      // return content;
    });
};

// Validar Login para Iniciar Sesión con Google
export const loginConGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  logueo().signInWithPopup(provider)
    .then((userCredential) => {
    /*  console.log('google');
      console.log(userCredential); */
      const newUser = userCredential.additionalUserInfo.isNewUser;
      if (newUser) {
        const idUser = userCredential.user.uid;
        const nameUser = userCredential.additionalUserInfo.profile.given_name;
        const lastNameUser = userCredential.additionalUserInfo.profile.family_name;
        const fullNameUser = userCredential.additionalUserInfo.profile.name;
        const photoUser = userCredential.additionalUserInfo.profile.picture;
        const emailUser = userCredential.additionalUserInfo.profile.email;
        // asigno values a sus Keys
        const infoUser = {
          uid: idUser,
          name: nameUser,
          lastName: lastNameUser,
          fullName: fullNameUser,
          photo: photoUser,
          email: emailUser,
          about: 'Escribe aquí sobre tí y lo que mas te gusta hacer!!!',
          url: 'Escribe tus redes sociales aquí para que te sigan tus aliadas!!!',
          phrase: 'Si se puede imaginar, se puede programar.',
        };
        // db.collection('pruebita')
        dataBase().collection(constantes.TABLA_USUARIO)
          .add(infoUser);
      }
      // constantes.URL_HOME=> '#/home' = url
      // window.location.hash(url) => redirect(url))
      // const user = userCredential.user; // obtener el actual user
      redirect(constantes.URL_HOME);
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      const content = document.querySelector('#msjErrorGoogle');
      if (errorCode === 'auth/network-request-failed') {
        content.style.display = 'block';
        content.innerText = 'Error al conectarse a la red.';
      }
      // return content;
    });
};

// Registrar correo para Iniciar Sesión con Correo
export const registrarUsuario = (user) => {
  logueo()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
    /*  console.log('se registro');
      console.log(userCredential); */
      const idUser = userCredential.user.uid;
      const fullNameUser = `${user.name} ${user.lastName}`;
      const photoUser = constantes.PHOTO_USER;
      // asigno values a sus Keys
      const newUser = {
        uid: idUser,
        name: user.name,
        lastName: user.lastName,
        fullName: fullNameUser,
        photo: photoUser,
        email: user.email,
        about: 'Escribe aquí sobre tí y lo que mas te gusta hacer!!!',
        url: 'Escribe tus redes sociales aquí para que te sigan tus aliadas!!!',
        phrase: 'Si se puede imaginar, se puede programar.',
      };
      // db.collection('pruebita')
      dataBase().collection(constantes.TABLA_USUARIO)
        .add(newUser);
    })
    .catch((error) => {
      document.querySelector('#btnRegister').innerHTML = 'Registrarme';
      document.querySelector('#btnRegister').disabled = false;
      const errorCode = error.code;
      const errorMessage = error.message;
      const content = document.querySelector('#msjErrorModal');
      content.style.display = 'block';
      switch (errorCode) {
        case 'auth/weak-password':
          content.innerText = 'La contraseña es muy corta (Mínimo 6 caracteres).';
          break;
        case 'auth/email-already-in-use':
          content.innerText = 'El correo electrónico ya está registrado.';
          break;
        case 'auth/invalid-email':
          content.innerText = 'Correo electrónico no válido.';
          break;
        default:
          content.innerText = errorMessage;
      }
      // return content;
    });
};
