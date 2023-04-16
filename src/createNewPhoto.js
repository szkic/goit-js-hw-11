export const drawPhoto = pictures => {
  return pictures.data.hits
    .map(
      picture =>
        `
    <div class="photo-card border rounded shadow-lg">
      <a href="${picture.largeImageURL}" class="test"><img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" class="w-80 h-52 object-cover" /></a>
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
    .join('');
};
