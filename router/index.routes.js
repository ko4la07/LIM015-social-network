/* import { navBar, posts, asideAliadas } from '../lib/home.js';
import { login } from '../lib/login.js';
import { profile } from '../lib/profile.js';
import { notifications } from '../lib/notifications.js';
import { notFound } from '../lib/404.js';  TODO ESTO POR 'components' */
import { components } from '../lib/index.js';
import { constantes } from '../lib/utilidades.js';

const content = document.querySelector('#container');

// arma la plantilla para la Vista
function renderView(bodyView) {
  content.appendChild(components.NavBar());
  bodyView.forEach((element) => content.appendChild(element));
  content.appendChild(components.Footer());
}

export const router = (hash) => {
  content.innerText = '';
  switch (hash) {
    case '':
    case '#':
    case '#/':
    case constantes.URL_LOGIN:
      content.appendChild(components.Login());
      content.appendChild(components.Footer());
      break;
    case constantes.URL_NOTIF:
      /* content.appendChild(components.NavBar());
         content.appendChild(components.Notifications());
         content.appendChild(components.Footer()); */
      renderView([components.Login()]);
      break;
    case constantes.URL_HOME:
      /* content.appendChild(components.NavBar());
         content.appendChild(components.Posts());
         content.appendChild(components.AsideAliadas());
         content.appendChild(components.Footer()); */
      renderView([components.AsideAliadas(), components.Posts()]);
      break;
    case constantes.URL_PROFILE:
      /* content.appendChild(components.NavBar());
         content.appendChild(components.Profile());
         content.appendChild(components.Footer()); */
      renderView([components.Profile()]);
      break;
    default:
      content.appendChild(components.Error());
  }
  // return content;
};
