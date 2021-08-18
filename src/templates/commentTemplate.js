export const commentTemplate = (commentDoc) => {
  const user = firebase.auth().currentUser;
  // const displayName = user.displayName;
  // const photoURL = user.photoURL;
  // const uid = user.uid;
  const divElement = document.createElement('div');
  divElement.className = 'comments-container';

  divElement.innerHTML = `
    <div id = 'user-post'>
      <div id = 'each-comment'>
        <div id = 'user-info-post'>
        ${commentDoc.photo ? `<img id='image-comment' src="${commentDoc.photo}" > ` : '<img id="image-comment" src="assets/img/user.png">'}
        </div>

        <div id = 'comment-users'>
        <div id = 'content-comment'>
          
          ${commentDoc.name ? `<div id = 'user-name'>${commentDoc.name}</div>` : `<div id = 'user-name'>${commentDoc.email}</div>`}

          <p id='cp${commentDoc.id}' class = 'comment-p'>${commentDoc.comment}</p>
        <textarea id='ct${commentDoc.id}' style="display:none;" class = 'comment-textarea'>${commentDoc.comment}</textarea>
        </div>
        <span class='date-post' id = 'date-comment'>${commentDoc.datePost}
          </span>
        </div>
        
      
      <div id='btns-comment-delete-edit' class = '${(user.uid === commentDoc.uid) || 'hide'}'>
        <button class='btn-comment-delete'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path data-id='${commentDoc.id}' d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
      </svg> </button>
        <button id="cb${commentDoc.id}" class='btn-comment-edit'> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
        <path data-id='${commentDoc.id}' d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
      </svg> </button>
        <button class="btn-comment-edit" style="display:none;"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-save" viewBox="0 0 16 16">
        <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
      </svg></button>
      
      </div>
      </div>
      `;
  return divElement;
};
