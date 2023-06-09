import { ImageModal } from 'components/Modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { GalleryImage, GalleryItem } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  static propTypes = {
    id: PropTypes.number,
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  state = {
    selectedImage: null,
  };
  setSelectedImage = () => {
    this.setState({ selectedImage: this.props.largeImageURL });
  };
  closeModal = () => {
    this.setState({ selectedImage: null });
  };
  render() {
    const { webformatURL, largeImageURL, tags, id } = this.props;
    return (
      <GalleryItem key={id}>
        <GalleryImage src={webformatURL} alt={tags} onClick={this.setSelectedImage} />
        <ImageModal
          isOpen={this.state.selectedImage !== null}
          onClose={this.closeModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      </GalleryItem>
    );
  }
}
