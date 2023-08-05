import { galleryItems } from './gallery-items.js';

const container = document.querySelector('.gallery')

function createMarkup(arr) {

  return arr.map(({ preview, original, description }) => ` 
     <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"  />
      </a>
    </li>   

   `).join('');
}

container.insertAdjacentHTML('beforeend', createMarkup(galleryItems));

container.addEventListener('click', handlerProductClick);


// !evt.target.classList.contains('gallery__image')
// evt.target === evt.currentTarget
// обидві умови працюють, але коли я обираю умову evt.target === evt.currentTarget
// то коли модальне вікно відкрите при натисканні клавіши Enter вибране фото починає
// при кожному натисканні темнітию
// Я досі не можу зрозуміти яку умову вибрати, бо обидві працюють крім з випадком Enter
// тому обрав той варіант який не дуже бо хотілося  будьласка пояснення)
function handlerProductClick(evt) {
  // console.log(evt.key);
  // console.log(evt.code);
  evt.preventDefault();

  if (evt.target === evt.currentTarget) {

    return
  }
  const sourse = evt.target.dataset.source;
  // console.log(evt.target.dataset);
  // console.log(sourse);

  const instance = basicLightbox.create(`
    <img src="${sourse}" >
`)
  instance.show();

  container.addEventListener('keydown', evt => {
    // console.log(evt.key);
    if (evt.code === 'Escape') {
      instance.close();
    }
  });
}
