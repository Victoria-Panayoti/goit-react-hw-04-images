import { ImageModal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
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
      <li key={id}>
        <img src={webformatURL} alt={tags} onClick={this.setSelectedImage} />
        <ImageModal
          isOpen={this.state.selectedImage !== null}
          onClose={this.closeModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      </li>
    );
  }
}
