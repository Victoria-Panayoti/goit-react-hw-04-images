import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchGallery } from '../Services/Api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    gallery: [],
    query: '',
    page: 1,
    isLoading: false,
    loadMore: false,
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
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      this.setState(state => ({
        gallery: [...state.gallery, ...gallery],
      }));
    } catch (error) {
      console.log('Error happend on server. Please, reload webpage.');
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
    const { gallery, isLoading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {gallery.length > 0 && <ImageGallery gallery={gallery} />}
        {!isLoading&& gallery.length > 11 && (
          <Button onClick={this.loadMore} />
        )}
      </div>
    );
  }
}
