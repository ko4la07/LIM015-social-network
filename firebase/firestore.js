/* ======================== Funciones CRUD ==================================== */
// ---Función obtener un post especifico---
export const getPost = (id) => firebase.firestore().collection('posts').doc(id).get();

// ---Función guardar post---
export const savePosts = (
  post, FieldValue, displayName, photoURL,
  email, uid, privacyUserPost, datePost,
) => {
  // se crea una colección 'posts'
  firebase.firestore().collection('posts').doc().set({
    post,
    timestamp: FieldValue.serverTimestamp(), // tiempo de creación del post en nanosegundos
    name: displayName,
    photo: photoURL,
    email,
    uid,
    privacy: privacyUserPost,
    datePost,
    hearts: [],
  });
};

// ---Función actualizar un post especifico---
export const updatePost = (id, updatedPost) => firebase.firestore().collection('posts').doc(id).update(updatedPost);

// ---Función borrar un post especifico---
export const deletePost = (id) => firebase.firestore().collection('posts').doc(id).delete();

// --- Actualizar privacidad ---
export const updatePrivacy = (id, status) => firebase.firestore().collection('posts').doc(id).update({ privacy: status });

// --- Hearts ---
export const editHeart = (id, hearts) => firebase.firestore().collection('posts').doc(id).update({ hearts });

// --- Función guardar comentario ---
export const saveComment = (
  comment, idComment, FieldValue, displayName, photoURL, datePost, uid, email,
) => {
  // se crea una colección 'posts' con los campos post y timestamp
  firebase.firestore().collection('comments').doc().set({
    comment,
    timestamp: FieldValue.serverTimestamp(), // tiempo de creación
    name: displayName,
    photo: photoURL,
    idComment,
    datePost,
    uid,
    email,
  });
};

export const getPos = (callback) => firebase.firestore().collection('posts')
  .onSnapshot((querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });
