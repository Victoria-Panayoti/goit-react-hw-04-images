import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/';
const KEY = '34439095-285021b504ed55081c1ba79b6';

export const fetchGallery = async (q, page) => {
  const responce = await axios.get('api/', {
    params: {
      key: KEY,
      q,
      image_type: 'photo',
      per_page: 12,
      orientation: 'horizontal',
      page,
    },
  });
  return responce.data;
};
