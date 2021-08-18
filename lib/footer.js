export const footer = () => {
  const container = document.createElement('footer');
  const copyright = new Date();
  const update = copyright.getFullYear();
  const footerTexto = `© 2021 - ${update} <CodeGirls>`;
  container.innerText = footerTexto;
  return container;
};
