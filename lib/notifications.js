export const notifications = () => {
  const container = document.createElement('div');
  const template = `
    <p>Notificaciones</p>
  `;
  container.innerHTML = template;
  return container;
};
