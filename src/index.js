import Notiflix from 'notiflix';
import axios from 'axios';

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

const fetchPhotos = () => {
  apiSearch()
    .then(pictures => {
      const totalHits = pictures.data.total;

      if (pictures.data.hits.length === 0) throw new Error();

      pictureEl.innerHTML = showPictures(pictures);

      totalHits > 40
        ? (loadMoreBtn.style.visibility = 'visible')
        : (loadMoreBtn.style.visibility = 'hidden');

      console.log(totalHits);

      Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
};

const fetchNewPhotos = () => {
  apiSearch()
    .then(pictures => {
      const totalHits = pictures.data.total;

      pictureEl.insertAdjacentHTML('beforeend', showPictures(pictures));

      totalHits / page > 40
        ? (loadMoreBtn.style.visibility = 'visible')
        : (loadMoreBtn.style.visibility = 'hidden');

      console.log(totalHits / page);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
};

const showPictures = pictures => {
  return (drawPicture = pictures.data.hits
    .map(
      picture =>
        `
    <div class="photo-card border rounded shadow-lg">
      <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" class="w-80 h-52 object-cover" />
        <div class="info p-3 text-sm flex justify-between items-center">
          <p class="info-item flex flex-col text-center">
            <b>Likes</b>
            ${picture.likes}
          </p>
          <p class="info-item flex flex-col text-center">
            <b>Views</b>
            ${picture.views}
          </p>
          <p class="info-item flex flex-col text-center">
            <b>Comments</b>
            ${picture.comments}
          </p>
          <p class="info-item flex flex-col text-center">
            <b>Downloads</b>
            ${picture.downloads}
          </p>
        </div>
    </div>`
    )
    .join(''));
};

searchButtonEl.addEventListener('click', e => {
  page = 1;
  e.preventDefault();
  fetchPhotos();

  console.log('first button', page);
});

loadMoreBtn.addEventListener('click', () => {
  page++;
  fetchNewPhotos();

  console.log('second button', page);
});
