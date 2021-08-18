export const postTemplate = (postDoc) => {
  const user = firebase.auth().currentUser;
  // const displayName = user.displayName;
  const photoURL = user.photoURL;
  // const uid = user.uid;
  const divElement = document.createElement('div');
  divElement.className = 'wall-container-post';

  divElement.innerHTML = `
    <div id = 'user-post'>
    <div id = 'user-info-post'>
    ${postDoc.photo ? `<img id='user-image' src="${postDoc.photo}" > ` : '<img id="user-image" src="assets/img/user.png">'}
      <div id = 'name-container'>
  
        ${postDoc.name ? `<div id = 'user-name'>${postDoc.name}</div>` : `<div id = 'user-name'>${postDoc.email}</div>`}
        
        <div id = 'date-privacy-post-container'>
          <div class='date-post'>${postDoc.datePost}
          </div>
          <select name="options"  class="selects-privacy ${(user.uid === postDoc.uid) || 'hide'}">
            <option value="0" id='${postDoc.id}' ${(postDoc.privacy === '1') || 'selected'} class="styleSelect">Público</option>
            <option value="1" id='${postDoc.id}' ${(postDoc.privacy === '0') || 'selected'} class="styleSelect">Privado</option>
          </select>
        </div>
      </div>
    </div>
      <p id='p${postDoc.id}' class ='post-p'>${postDoc.post}</p>
      <textarea id='t${postDoc.id}' style="display:none;" class = 'textarea-post'>${postDoc.post}</textarea>

    <div id = 'btns-container-heart'>

      <div id='counters-heart-comment'>
        <div id='container-hearts'>
        </div>
        <div><button class ="btn-heart ${(postDoc.hearts.indexOf(user.uid) === -1)}"><svg class='btns-heart' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-suit-heart" viewBox="0 0 16 16">
          <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
          </svg></button> <span class = 'counts-heart'>${postDoc.hearts.length}</span> 
        </div>

      </div>

      <div id='btns-post-delete-edit' class = '${(user.uid === postDoc.uid) || 'hide'}'>
        <button class='btn-post-delete btn-delete' data-id='${postDoc.id}'>Eliminar</button>
        <button id="b${postDoc.id}" class='btn-post-edit btn-edit' data-id='${postDoc.id}'>Editar</button>
        <button class="btn-post-edit" style="display:none;">Guardar</button>
      </div>

      </div>

      <div id='line-comment'>
      </div>
      <div id = 'text-comment'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16">
        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
        </svg> Comentarios
      </div>
      <div id='comment-container'>
      ${photoURL ? `<img id='user-image-comment' src="${photoURL}" > ` : '<img id="user-image-comment" src="assets/img/user.png">'}
      <textarea id='commentArea${postDoc.id}' placeholder = 'Escribir un comentario...'></textarea>
      <button id = 'btn-comment' class='btns-comment' data-id='${postDoc.id}'></button>
      </div>
      <div id='comments-${postDoc.id}'></div>
      `;
  return divElement;
};
