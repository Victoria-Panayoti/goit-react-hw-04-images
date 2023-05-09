import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchGallery } from '../Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';

export class App extends Component {
  state = {
    gallery: [],
    query: '',
    page: 1,
    isLoading: false,
    loadMore: false,
    error: null,
  };

  handleFormSubmit = ({ searchQuery }) => {
    const { query, page } = this.state;
    if (query === searchQuery && page === 1) return;
    this.setState({
      query: searchQuery.toLowerCase(),
      gallery: [],
      page: 1,
      loadMore: false,
    });
  };
  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getGallery();
    }
  }
  getGallery = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });
    try {
      const responce = await fetchGallery(query, page);
      const gallery = responce.hits;
      const total = responce.totalHits;
      if (total === 0) {
        toast.warning('havent found anything, try smthg else.');
        return;
      }
      this.setState(state => ({
        gallery: [...state.gallery, ...gallery],
      }));
    } catch (error) {
      toast.error(`Smthg went wrong, we re so sorry. ${error.message}`);
    } finally {
      this.setState({ isLoading: false });
    }
  };
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  render() {
    const { gallery, isLoading,error } = this.state;
    return (
      <Layout>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} theme="colored" pauseOnHover />
        {error && (
          <h1 style={{ color: 'orangered', textAlign: 'center' }}>
            {error.message}
          </h1>
        )}
        {isLoading && <Loader />}
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
        {!isLoading && gallery.length > 11 && (
          <Button onClick={this.loadMore} />
        )}
        <GlobalStyle/>
      </Layout>
    );
  }
}
