import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34439095-285021b504ed55081c1ba79b6';

export const fetchGallery = async (values) => {
  const responce = await axios.get(`${BASE_URL}?key=${KEY}`, {
    params: {
      q: {values},
      image_type: 'photo',
      per_page: 12,
      orientation: 'horizontal',
      page: 1,
    },
  });
    return responce.data;
};

