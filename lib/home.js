import { postTemplate } from '../templates/postTemplate.js';
import { commentTemplate } from '../templates/commentTemplate.js';
import { constantes, redirect } from './utilidades.js';
import {
  deletePost, editHeart, getPost, saveComment, savePosts, updatePost, updatePrivacy,
} from '../firebase/firestore.js';

// ------------Publicaciones------------------
export const posts = () => {
  const db = firebase.firestore(); // Llamando a firestore
  const FieldValue = firebase.firestore.FieldValue;

  /* ========================DATOS DE USUARIO==================================== */
  const user = firebase.auth().currentUser;
  // --------------
  let displayName;
  let photoURL;
  let email;
  let uid;
  if (user !== null) {
    displayName = user.displayName;
    photoURL = user.photoURL;
    email = user.email;
    uid = user.uid;
  } else {
    redirect(constantes.URL_LOGIN);
  }
  // ---------------

  const date = new Date();
  const datePost = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().replace(/T/, ' ').replace(/\..+/, '');
  // console.log(displayName);
  let privacyUserPost = '0';

  // ------------Template create post-----------
  const containerPosts = document.createElement('section');
  containerPosts.className = 'create-container';

  const template = `
    <div id = 'line-nav'></div>
    <div id='btn-new-post-container' style='display:flex;'>
    <button id='btn-new-post'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
  </svg> <div> Crear nueva publicación </div></button>
    </div>

    <div class='post-container' id='post-create' style='display:none;'>
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
    <textarea id='post-content' class='post' placeholder='Escribe aquí tu post...'></textarea>
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

    <button id='btn-form-discard'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
  </svg><div>Descartar</div></button>
    </div>
    </div>
    <div id='line-after'></div>
    <div id='wall-container'></div>
    `;

  containerPosts.innerHTML = template;

  // ---Emojis en la parte de CREAR POST ---
  const input = containerPosts.querySelector('.post');
  // eslint-disable-next-line no-undef
  const picker = new EmojiButton({
    position: 'right-start',
  });
  picker.on('emoji', (emoji) => {
    input.value += emoji;
  });
  const emojiPost = containerPosts.querySelector('.emoji-post');
  emojiPost.addEventListener('click', () => {
    // eslint-disable-next-line no-unused-expressions
    picker.pickerVisible ? picker.hidePicker() : picker.showPicker(input);
  });

  // -------------------

  // let editStatus = false;
  let idPost = '';

  const postForm = containerPosts.querySelector('#post-form');

  const postContent = postForm['post-content'];

  // ---Mostrar y ocultar boton de creación de nuevo post---
  const btnNewPost = containerPosts.querySelector('#btn-new-post');
  btnNewPost.addEventListener('click', () => {
    containerPosts.querySelector('#post-create').style.display = 'flex';
    containerPosts.querySelector('#btn-new-post').style.display = 'none';
  });

  const btnDiscard = containerPosts.querySelector('#btn-form-discard');
  btnDiscard.addEventListener('click', () => {
    containerPosts.querySelector('#post-create').style.display = 'none';
    containerPosts.querySelector('#btn-new-post').style.display = 'flex';
    document.querySelector('#post-content').value = '';
  });

  /* ======================== Subir Imagen ==================================== */
  // let file;
  // const btnAddImage = containerPosts.querySelector('#addImage');
  // btnAddImage.addEventListener('change', (e) => {
  //   file = e.target.files[0];
  //   console.log(file);
  // });

  // console.log(file);
  /* ========================Privacity post==================================== */

  const selectPrivacy = containerPosts.querySelector('.selectPrivacy');
  selectPrivacy.addEventListener('change', () => {
    privacyUserPost = selectPrivacy.value;
  });

  /* ======================== Funciones CRUD get posts ==================================== */

  // Obtener post y pintarlos en el muro principal
  const getPosts = () => {
    const wallContainer = containerPosts.querySelector('#wall-container');
    // const getCollection = db.collection('posts');
    // const postCollection = await getCollection.get();
    const collection = db.collection('posts').where('privacy', '==', '0').orderBy('timestamp', 'desc');
    // const collection = db.collection('posts').where('uid', '==', uid);
    // const collectionToShow = collectionPublic.concat(collectionPrivacyCurrentUser);
    // const collection1 = collection.orderBy('timestamp', 'desc');
    collection.onSnapshot((postCollection) => {
      wallContainer.innerHTML = '';
      // console.log(postCollection);
      postCollection.forEach((doc) => {
        const postDoc = doc.data();
        postDoc.id = doc.id; // id del documento
        // console.log(postDoc);
        const postElement = postTemplate(postDoc);

        wallContainer.appendChild(postElement);

        /* ===============Editando la privacidad en cada post================= */
        const selectsPrivacy = document.querySelectorAll('.selects-privacy');

        selectsPrivacy.forEach((select) => {
          select.addEventListener('change', () => {
            privacyUserPost = select.value;
            const idPostSlct = select[select.selectedIndex].id;
            updatePrivacy(idPostSlct, privacyUserPost);
            privacyUserPost = '0';
          });
        });

        // /* =============== Dar likes (hearts) ================= */

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
            idPost = e.target.dataset.id;
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
        const containerComments = containerPosts.querySelector(`#comments-${postDoc.id}`);
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

            const newComment = containerPosts.querySelector(`#commentArea${idComment}`);
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

  getPosts();

  // -------------------

  postForm.addEventListener('submit', (e) => {
    if (postContent.value !== '') {
      e.preventDefault();
      // const post = postForm['post-content'];
      // console.log(post.value);
      // await savePosts(post.value); // Guardamos el contenido del post
      savePosts(
        postContent.value, FieldValue, displayName, photoURL, email, uid, privacyUserPost, datePost,
      );

      containerPosts.querySelector('#post-create').style.display = 'none';
      containerPosts.querySelector('#btn-new-post').style.display = 'flex';
    }
    getPosts();

    postForm.reset();
  });

  return containerPosts;
};

// --------ALIADAS-------------

export const asideAliadas = () => {
  const db = firebase.firestore();
  const containerAliadas = document.createElement('aside');
  containerAliadas.className = 'aside-aliadas';

  const template = `
    <div id = 'aliadas-title'>
    <div>#Aliadas</div>
    </div>
    <div id = 'aliadas-wall'></div>
  `;

  containerAliadas.innerHTML = template;

  const aliadasWall = containerAliadas.querySelector('#aliadas-wall');

  const dbUsersCollection = db.collection('users');
  dbUsersCollection.onSnapshot((usersCollection) => {
    usersCollection.forEach((doc) => {
      const userDoc = doc.data();

      const templateAliada = `
      <div id = 'aliada-info'>
      <img src = '${userDoc.photo ? userDoc.photo : 'assets/img/user.png'}' id = 'img-aliada'>
      <div id = 'name-aliada'>${userDoc.name ? userDoc.fullName : userDoc.email}</div>
      </div>
      `;
      aliadasWall.innerHTML += templateAliada;
      // console.log(userDoc.nameUser); // Nombre de usuario
    });
  });

  return containerAliadas;
};
