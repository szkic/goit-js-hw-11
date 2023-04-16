import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { drawPhoto } from './createNewPhoto';

const searchInputEl = document.querySelector('#search-form input');
const searchButtonEl = document.querySelector('#search-form button');
const pictureEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

loadMoreBtn.style.visibility = 'hidden';
let page = 1;
let pageShow = 40;

const apiSearch = async () => {
  const API_URL = 'https://pixabay.com/api/';

  const response = await axios.get(API_URL, {
    params: {
      key: '35294695-6bfc4b24db5372eaae3354bab',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      q: searchInputEl.value,
      per_page: pageShow,
      page: page,
    },
  });

  return response;
};

const loadPhotos = () => {
  apiSearch()
    .then(pictures => {
      const totalHits = pictures.data.total;

      if (pictures.data.hits.length === 0) throw new Error();

      totalHits > 40
        ? (loadMoreBtn.style.visibility = 'visible')
        : (loadMoreBtn.style.visibility = 'hidden');

      pictureEl.innerHTML = drawPhoto(pictures);

      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

      let lightbox = new SimpleLightbox('.gallery a');
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
};

const loadNewPhotos = () => {
  apiSearch().then(pictures => {
    const totalHits = pictures.data.total;

    totalHits / page > 40
      ? (loadMoreBtn.style.visibility = 'visible')
      : (loadMoreBtn.style.visibility = 'hidden');

    pictureEl.insertAdjacentHTML('beforeend', drawPhoto(pictures));

    let lightbox = new SimpleLightbox('.gallery a');

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 11,
      behavior: 'smooth',
    });
  });
};

searchButtonEl.addEventListener('click', e => {
  e.preventDefault();
  page = 1;
  loadPhotos();
});

loadMoreBtn.addEventListener('click', () => {
  page++;
  loadNewPhotos();
});
