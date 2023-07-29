import { galleryItems } from './gallery-items.js';
// Change code below this line

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const gallery = document.querySelector('.gallery');

function createGalleryItemMarkup({ preview, original, description }) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
        <span class="gallery__caption">${description}</span>
      </a>
    </li>
  `;
}

function renderGalleryItems() {
  const galleryItemsMarkup = galleryItems.map(item => createGalleryItemMarkup(item)).join('');
  gallery.insertAdjacentHTML('beforeend', galleryItemsMarkup);
}

renderGalleryItems();
initializeLightbox();

function initializeLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    captionPosition: 'bottom',
    captionsData: 'alt',
  });

  gallery.addEventListener('shown.simplelightbox', event => {
    const captionElement = event.target.querySelector('.gallery__caption');
    captionElement.classList.add('visible');
  });

  gallery.addEventListener('closed.simplelightbox', event => {
    const captionElement = event.target.querySelector('.gallery__caption');
    captionElement.classList.remove('visible');
  });
}