// import { saveProfile } from '../firebase/storage.js';
import { constantes, redirect } from './utilidades.js';
import { postTemplate } from '../templates/postTemplate.js';
import { commentTemplate } from '../templates/commentTemplate.js';
import {
  editHeart, deletePost, getPost, updatePost, saveComment, savePosts, updatePrivacy,
} from '../firebase/firestore.js';

export const profile = () => {
  const db = firebase.firestore(); // Llamando a firestore
  const FieldValue = firebase.firestore.FieldValue;

  const user = firebase.auth().currentUser;
  let uid;
  let displayName;
  let photoURL;
  let email;
  if (user !== null) {
    uid = user.uid;
    displayName = user.displayName;
    photoURL = user.photoURL;
    email = user.email;
  } else {
    redirect(constantes.URL_LOGIN);
  }
  // console.log(uid);
  // --------------
  const date = new Date();
  const datePost = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, '');

  let privacyUserPostProfile = '0';

  const containerProfile = document.createElement('section');
  containerProfile.className = 'container-profile';
  // const informationProfile = document.createElement('header');
  // const mainProfile = document.createElement('main');

  const contentInformationProfile = `     
  <div class="information-profile">
  
    <div class = 'profile-img-name'>

      <div id = 'profile-image'>
        <div class="profile-photo">
          
        </div>

        <div id="camera-icon" class="camera"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-camera-fill"  id="camera" viewBox="0 0 16 16">
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z"/></svg>
        </div>
      
        <label id="select-profile" for="select-photo-profile">
            <input type="file" id="select-photo-profile" class="hidden" accept="image/jpeg, image/png">
        </label>
      </div>
    
      <div id = 'container-profile-name'>
        <h3 id="myname">Nombre</h3>
        <p class="profile-user-name"></p>
        <textarea class="profile-user-name-edit" style="display:none;"></textarea>
      </div>

    </div>

    <div class = 'profile-aboutme'>
      <div id = 'profile-description'>
        <h2 class="aboutme">Sobre mi</h2>
        <div class="title-description">
          <p id="description-aboutme"></p>
          <textarea id = 'description-aboutme-edit' style = 'display:none;'></textarea>
        </div>
      </div>

      <div id = 'profile-links'>
        <h2 class="follow-me">Sigueme</h2>
        <div class ="title-links">
          <p id="links-aboutme"></p>
          <textarea id = 'links-aboutme-edit' style = 'display:none;'></textarea>
        </div>
      </div>

    </div>
  </div>

  <div class="edition-information">

    <button id='btn-edit-profile-all-Information'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/></svg> Editar perfil</button>

    <button id = 'btn-update-profile-information' style = 'display:none;'> Guardar</button>

    <img src = 'assets/img/logoCodeGirls.svg' id = 'logo-cg-profile'>

    <div class = "profile-privacy" id="btn-profile-privacy">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgb(255, 255, 255); --darkreader-inline-fill:#a2a19f;" data-darkreader-inline-fill=""><path d="m11.998 17 7-8h-14z"></path></svg>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgb(255, 255, 255); --darkreader-inline-fill:#a2a19f;" data-darkreader-inline-fill=""><path d="M20 12c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5S7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8zM9 7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9V7z"></path></svg>
    </div>

  </div>

  <div class = 'line-black-profile'></div>

  <div id = 'phrase-edit-content'>
    <p id = 'profile-phrase'>"Si se puede imaginar, se puede programar".</p>
    <textarea id = 'profile-phrase-edit' style = 'display:none;'></textarea>

    <button id = 'btn-phrase-edit'>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/></svg>
    </button>
    <button id = 'btn-phrase-save' style = 'display:none;'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
    <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
  </svg></button>
  
  </div>

  <div class = 'line-black-profile'></div>

  <div id = 'container-profile-main'></div>
`;

  const contentMainProfile = `
     <div id="aside-left">
        <ul>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
            <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
          </svg> Mis aliadas</a></li>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter-square-fill" viewBox="0 0 16 16">
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm.5 5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1zM4 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
          </svg>Mis post</a></li>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"/>
          </svg>Mi frase favorita es:</a></li>

          <div class="frase-favorita" id = 'favorite-phrase'>
            <p id="frase">"Si se puede imaginar, se puede programar".</p>
          </div>
        </ul>
    </div> 

    <div class = 'division-line-left'></div>

    <div class="aside-profile-mobile">
        <ul>
          <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-heading" viewBox="0 0 16 16">
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
          <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/>
          </svg></a>
          </li>
          <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
          </svg></a>
          </li>
          <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
          <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
          </svg></a></li>
          <li><a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
          </svg></a></li>
          <li><a href="#">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code-slash" viewBox="0 0 16 16">
          <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z"/>
          </svg></a></li>
        </ul>
    </div> 

    <div class = 'mobile-line-left' ></div>

    <div id = 'create-new-post-profile'></div>

    <div class = 'division-line-right'></div>

     <div id="aside-right">
        <ul>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paperclip" viewBox="0 0 16 16">
            <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z"/>
            </svg>Mis archivos</a></li>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>Mis eventos</a></li>
            <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-code" viewBox="0 0 16 16">
            <path d="M5.854 4.854a.5.5 0 1 0-.708-.708l-3.5 3.5a.5.5 0 0 0 0 .708l3.5 3.5a.5.5 0 0 0 .708-.708L2.707 8l3.147-3.146zm4.292 0a.5.5 0 0 1 .708-.708l3.5 3.5a.5.5 0 0 1 0 .708l-3.5 3.5a.5.5 0 0 1-.708-.708L13.293 8l-3.147-3.146z"/>
            </svg>Mis códigos</a></li>
        </ul>
    </aside> 
    `;

  const template = `
    <div class='post-container' id='post-create'>
    <div id = 'user-info'>
    ${photoURL ? `<img id='user-image' src="${photoURL}" > ` : '<img id="user-image" src="assets/img/user.png">'}
      <div>
      ${displayName ? `<div id = 'user-name'>${displayName}</div>` : `<div id = 'user-name'>${email}</div>`}
      <select id='options' class='selectPrivacy'>
        <option value='0' selected >Público</option>
        <option value='1'>Privado</option>
      </select>
      </div>
      </div>
    <form id='post-form'>
    <textarea id='post-content' class='post' placeholder='¿Qué estás pensando?'></textarea>
    <button id='btn-form-save' class='btns-save'>Publicar</button>
    </form>
    <div id = 'btns-emoji-discard'>
    <div id = 'emoji-photo'>
    <button class='emoji-post'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-emoji-smile" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
  </svg></button>

    <div class = 'photo-post'>
    <input type="file" id="addImage" accept ="image/*" class= "add-img"> 
    <label for= "addImage"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
  </svg>
    </label>
    </div>
  </div>
    </div>
    </div>
    <div id = 'posts-profile'></div>
    `;

  containerProfile.innerHTML = contentInformationProfile;

  const containerPostProfile = containerProfile.querySelector('#container-profile-main');
  containerPostProfile.innerHTML = contentMainProfile;

  const newPostProfile = containerProfile.querySelector('#create-new-post-profile');
  newPostProfile.innerHTML = template;

  // ---Emojis en la parte de CREAR POST ---
  const input = containerPostProfile.querySelector('.post');
  // eslint-disable-next-line no-undef
  const picker = new EmojiButton({
    position: 'right-start',
  });
  picker.on('emoji', (emoji) => {
    input.value += emoji;
  });
  const emojiPost = containerPostProfile.querySelector('.emoji-post');
  emojiPost.addEventListener('click', () => {
    // eslint-disable-next-line no-unused-expressions
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(input);
  });

  // -----------------------
  const postForm = containerPostProfile.querySelector('#post-form');

  const postContent = postForm['post-content'];
  // ================ Pintando la información del usuario ==========
  let datosUser;

  firebase.firestore().collection('users').where('uid', '==', uid)
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((docto) => {
        datosUser = docto.data();
        // console.log(docto.id);
        datosUser.id = docto.id;
        document.querySelector('.profile-photo').innerHTML = `<img id="img-profile" class="photo" src= '${datosUser.photo}'>`;
        document.querySelector('.profile-user-name').innerHTML = `${datosUser.fullName}`;
        document.querySelector('#description-aboutme').innerHTML = `${datosUser.about}`;
        document.querySelector('#links-aboutme').innerHTML = `${datosUser.url}`;
        document.querySelector('#profile-phrase').innerHTML = `${datosUser.phrase}`;
        document.querySelector('#frase').innerHTML = `${datosUser.phrase}`;
      });
    });

  /* ========================Privacity post==================================== */

  const selectPrivacy = containerPostProfile.querySelector('.selectPrivacy');
  selectPrivacy.addEventListener('change', () => {
    privacyUserPostProfile = selectPrivacy.value;
  });
  /* ======================== Funciones CRUD get posts ==================================== */

  // Obtener post y pintarlos en el muro principal
  const getPostsProfile = () => {
    const profilePostContainer = containerPostProfile.querySelector('#posts-profile');
    // const getCollection = db.collection('posts');
    // const postCollection = await getCollection.get();
    const collection = db.collection('posts').where('uid', '==', uid);
    // const collection = db.collection('posts').where('uid', '==', uid);
    // const collectionToShow = collectionPublic.concat(collectionPrivacyCurrentUser);
    // const collection1 = collection.orderBy('timestamp', 'desc');
    collection.onSnapshot((postCollection) => {
      profilePostContainer.innerHTML = '';
      // console.log(postCollection);
      postCollection.forEach((doc) => {
        const postDoc = doc.data();
        postDoc.id = doc.id; // id del documento
        // console.log(postDoc);
        const postElement = postTemplate(postDoc);

        profilePostContainer.appendChild(postElement);

        /* ===============Editando la privacidad en cada post================= */
        const selectsPrivacy = document.querySelectorAll('.selects-privacy');

        selectsPrivacy.forEach((select) => {
          select.addEventListener('change', () => {
            privacyUserPostProfile = select.value;
            const idPostSlct = select[select.selectedIndex].id;
            updatePrivacy(idPostSlct, privacyUserPostProfile);
            privacyUserPostProfile = '0';
          });
        });
        /* ===============Editando la información del perfil================= */
        const btnUpdateProfile = document.querySelector('#btn-edit-profile-all-Information');
        btnUpdateProfile.onclick = () => {
          // console.log('hola');
          // Mostrando los textarea para editar
          const boxP = document.querySelector('.profile-user-name');
          const boxTextarea = document.querySelector('.profile-user-name-edit');
          boxP.style.display = 'none';
          boxTextarea.style.display = 'block';
          boxTextarea.innerHTML = datosUser.fullName;

          const boxPAboutme = document.querySelector('#description-aboutme');
          const boxTextareaAboutme = document.querySelector('#description-aboutme-edit');
          boxPAboutme.style.display = 'none';
          boxTextareaAboutme.style.display = 'block';
          boxTextareaAboutme.innerHTML = datosUser.about;

          const boxPLinks = document.querySelector('#links-aboutme');
          const boxTextareaLinks = document.querySelector('#links-aboutme-edit');
          boxPLinks.style.display = 'none';
          boxTextareaLinks.style.display = 'block';
          boxTextareaLinks.innerHTML = datosUser.url;

          // mostrando boton de guardar
          const btnSave = document.querySelector('#btn-update-profile-information');
          btnUpdateProfile.style.display = 'none';
          btnSave.style.display = 'block';

          // Evento del btn guardar información
          btnSave.addEventListener('click', async (event) => {
            event.preventDefault();
            await firebase.firestore().collection('users').doc(datosUser.id).update({ fullName: boxTextarea.value, about: boxTextareaAboutme.value, url: boxTextareaLinks.value });

            boxP.style.display = 'block';
            boxTextarea.style.display = 'none';
            boxTextarea.innerHTML = datosUser.fullName;

            boxPAboutme.style.display = 'block';
            boxTextareaAboutme.style.display = 'none';
            boxTextareaAboutme.innerHTML = datosUser.about;

            boxPLinks.style.display = 'block';
            boxTextareaLinks.style.display = 'none';
            boxTextareaLinks.innerHTML = datosUser.url;

            btnUpdateProfile.style.display = 'block';
            btnSave.style.display = 'none';
          });
        };

        /* ===============Editando FRASE del perfil================= */
        const btnEditPhrase = document.querySelector('#btn-phrase-edit');
        btnEditPhrase.onclick = () => {
          // console.log('hola');
          // Mostrando los textarea para editar
          const boxPhrase = document.querySelector('#profile-phrase');
          const boxTextareaPhrase = document.querySelector('#profile-phrase-edit');
          boxPhrase.style.display = 'none';
          boxTextareaPhrase.style.display = 'block';
          boxTextareaPhrase.innerHTML = datosUser.phrase;

          // mostrando boton de guardar
          const btnSavePhrase = document.querySelector('#btn-phrase-save');
          btnEditPhrase.style.display = 'none';
          btnSavePhrase.style.display = 'block';

          // Evento del btn guardar información
          btnSavePhrase.addEventListener('click', async (event) => {
            event.preventDefault();
            await firebase.firestore().collection('users').doc(datosUser.id).update({ phrase: boxTextareaPhrase.value });

            boxPhrase.style.display = 'block';
            boxTextareaPhrase.style.display = 'none';
            boxTextareaPhrase.innerHTML = datosUser.phrase;

            btnEditPhrase.style.display = 'block';
            btnSavePhrase.style.display = 'none';
          });
        };
        /* =============== Dar likes (hearts) ================= */

        const btnHeart = postElement.querySelector('.btn-heart');
        btnHeart.addEventListener('click', () => {
          const result = postDoc.hearts.indexOf(user.uid);
          // console.log(result);
          if (result === -1) {
            postDoc.hearts.push(user.uid);// agrega un elemnto user.uid
            editHeart(postDoc.id, postDoc.hearts);// actualiza el valor
          } else {
            postDoc.hearts.splice(result, 1);// quita un elemento en la posicion result(user index)
            editHeart(postDoc.id, postDoc.hearts);// actualiza el valor
          }
        });

        /* ===============Boton Borrar================= */
        const btnsDelete = document.querySelectorAll('.btn-delete');
        btnsDelete.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            // Eliminamos el post
            deletePost(e.target.dataset.id);
            // Eliminamos los comentarios del post
            db.collection('comments').where('idComment', '==', e.target.dataset.id)
              .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((docto) => {
                  db.collection('comments').doc(docto.id).delete();
                });
              });
          });
        });
        /* ===============Boton Editar================= */
        const btnsEdit = document.querySelectorAll('.btn-edit');
        btnsEdit.forEach((btn) => {
          btn.addEventListener('click', async (e) => {
            // editStatus = true;
            const idPost = e.target.dataset.id;
            const post = await getPost(e.target.dataset.id);
            const postData = post.data();
            // console.log(postData.post);
            /* containerPosts.querySelector('#post-create').style.display = 'flex';
            containerPosts.querySelector('#btn-new-post').style.display = 'none'; */
            const btnGuardar = document.querySelector(`#b${idPost}+button`);
            const btnEdit = document.querySelector(`#b${idPost}`);
            btnEdit.style.display = 'none';
            // btn.style.display = 'none';
            btnGuardar.style.display = 'block';
            const currentPostBox = document.querySelector(`#p${idPost}`);
            // const contentBox = document.querySelector(`#p${idPost}`);
            const editTextArea = document.querySelector(`#t${idPost}`);

            // editTextArea.innerHTML = postData.post;
            editTextArea.style.display = 'block';
            currentPostBox.style.display = 'none';
            editTextArea.innerHTML = postData.post;

            btnGuardar.addEventListener('click', async (event) => {
              event.preventDefault();
              await updatePost(idPost, { post: editTextArea.value });// Actualizamos contenido
            });
          });
        });

        /* =============== Todos los Comentarios ================= */
        const containerComments = containerPostProfile.querySelector(`#comments-${postDoc.id}`);
        const dbCollection = db.collection('comments');
        dbCollection.where('idComment', '==', postDoc.id).onSnapshot((commentCollection) => {
          containerComments.innerHTML = '';
          commentCollection.forEach((docComment) => {
            const commentDoc = docComment.data();
            commentDoc.id = docComment.id;

            const commentElement = commentTemplate(commentDoc);

            containerComments.appendChild(commentElement);
            /* ===============Boton Borrar COMENTARIO================= */
            // const containCo = document.querySelector('.comments-container');
            const btnsDeleteComment = document.querySelectorAll('.btn-comment-delete');
            btnsDeleteComment.forEach((btn) => {
            // eslint-disable-next-line no-param-reassign
              btn.onclick = (e) => {
                // Eliminamos el comentario
                db.collection('comments').doc(e.target.dataset.id).delete();
                // console.log(e.target.dataset.id);
              };
            });
            /* ===============Boton Editar COMENTARIO================= */
            const btnsUpdateComment = document.querySelectorAll('.btn-comment-edit');
            btnsUpdateComment.forEach((btn) => {
            // eslint-disable-next-line no-param-reassign
              btn.onclick = async (e) => {
                // editStatus = true;
                const idComment = e.target.dataset.id;
                // console.log(idComment);
                const docCom = db.collection('comments').doc(idComment);
                const commentDocument = await docCom.get();
                // console.log(commentDocument);
                const commentData = commentDocument.data();
                // console.log(commentData.comment); // Obtenemos el comentario

                const btnGuardarComment = document.querySelector(`#cb${idComment}+button`);
                const btnEditComment = document.querySelector(`#cb${idComment}`);
                btnEditComment.style.display = 'none';
                // btn.style.display = 'none';
                btnGuardarComment.style.display = 'block';
                const currentCommentBox = document.querySelector(`#cp${idComment}`);
                // const contentBox = document.querySelector(`#p${idPost}`);
                const editTextAreaComment = document.querySelector(`#ct${idComment}`);

                editTextAreaComment.style.display = 'block';
                currentCommentBox.style.display = 'none';
                editTextAreaComment.innerHTML = commentData.comment;

                btnGuardarComment.addEventListener('click', async (event) => {
                  event.preventDefault();
                  await db.collection('comments').doc(idComment).update({ comment: editTextAreaComment.value });// Actualizamos contenido del comentario
                });
              };
            });
          });
        });
        /* =============== Boton Comentar ================= */
        const btnsComment = document.querySelectorAll('.btns-comment');
        btnsComment.forEach((btn) => {
          // eslint-disable-next-line no-param-reassign
          btn.onclick = (event) => {
            const idComment = event.target.dataset.id;
            // console.log(idComment);

            const newComment = containerPostProfile.querySelector(`#commentArea${idComment}`);
            const comment = newComment.value;
            // console.log(comment);

            saveComment(comment, idComment, FieldValue, displayName,
              photoURL, datePost, uid, email);
            newComment.value = '';
          };
        });
      });
    });
  };

  getPostsProfile();
  // -------------------

  postForm.addEventListener('submit', (e) => {
    if (postContent.value !== '') {
      e.preventDefault();
      // const post = postForm['post-content'];
      // console.log(post.value);
      // await savePosts(post.value); // Guardamos el contenido del post
      savePosts(
        postContent.value, FieldValue, displayName, photoURL, email, uid,
        privacyUserPostProfile, datePost,
      );
    }
    getPostsProfile();

    postForm.reset();
  });

  return containerProfile;
};
