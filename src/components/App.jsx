import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchGallery } from '../Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { useEffect, useState } from 'react';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = ({ searchQuery }) => {
    if (query === searchQuery && page === 1) return;
    setGallery([]);
    setQuery(searchQuery.toLowerCase());
    setPage(1);
  };
  useEffect(() => {
    if (!query) {
      return;
    }
    const getGallery = async () => {
      setIsLoading(true);
      try {
        const responce = await fetchGallery(query, page);
        const gallery = responce.hits;
        const total = responce.totalHits;
        if (total === 0) {
          toast.warning('havent found anything, try smthg else.');
          return;
        }
        setGallery(prevGallery => [...prevGallery, ...gallery]);
      } catch (error) {
        toast.error(`Smthg went wrong, we re so sorry.`);
      } finally {
        setIsLoading(false);
      }
    };
    getGallery();
  }, [query, page]);

  return (
    <Layout>
      <Searchbar onSubmit={handleFormSubmit} />
      <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
      {isLoading && <Loader />}
      {gallery.length > 0 && <ImageGallery gallery={gallery} />}
      {!isLoading && gallery.length > 11 && (
        <Button
          onClick={() => {
            setPage(prevPage => prevPage + 1);
          }}
        />
      )}
      <GlobalStyle />
    </Layout>
  );
};
