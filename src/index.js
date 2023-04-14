import Notiflix from 'notiflix';

// const searchFormEl = document.getElementById('search-form');
const searchInputEl = document.querySelector('#search-form input');
const searchButtonEl = document.querySelector('#search-form button');
const pictureEl = document.querySelector('.gallery');

const API_URL = 'https://pixabay.com/api/';

const apiSearch = () => {
  const searchValue = searchInputEl.value;

  const searchParams = new URLSearchParams({
    key: '35294695-6bfc4b24db5372eaae3354bab',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    q: searchValue,
  });

  fetch(`${API_URL}?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(pictures => {
      showPictures(pictures);
    })
    .catch(error => {
      console.log(error);
    });
};

const showPictures = pictures => {
  const drawPicture = pictures.hits.map(picture => {
    return `
    <div class="photo-card border rounded shadow-lg mt-5">
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
    </div>`;
  });

  if (drawPicture.length === 0) {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  pictureEl.innerHTML = drawPicture.join('');
};

searchButtonEl.addEventListener('click', e => {
  e.preventDefault();
  apiSearch();
});
