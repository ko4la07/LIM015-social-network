// aqui exportaras las funciones que necesites
import { posts, asideAliadas } from './home.js';
import { profile } from './profile.js';
import { login } from './login.js';
import { notFound } from './404.js';
import { notifications } from './notifications.js';
import { footer } from './footer.js';
import { navBar, navLeft, navRight } from './nav.js';

export const components = {
  Posts: posts,
  NavBar: navBar,
  NavLeft: navLeft,
  NavRight: navRight,
  AsideAliadas: asideAliadas,
  Profile: profile,
  Login: login,
  Notifications: notifications,
  Error: notFound,
  Footer: footer,
};
