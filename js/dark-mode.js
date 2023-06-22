const html = document.querySelector('html');
const colorMode = document.querySelector('.color-mode');

const point = document.querySelector('.point');
colorMode.addEventListener('click', () => {
  point.classList.toggle('active');
  html.classList.toggle('dark-mode');
});
