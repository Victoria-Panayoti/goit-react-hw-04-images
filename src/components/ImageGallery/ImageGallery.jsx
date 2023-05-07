import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ gallery, selectedImage }) => (
  <ul>
    {gallery.map(({ id, webformatURL, tags, largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        webformatURL={webformatURL}
        tags={tags}
        largeImageURL={largeImageURL}
        // selectedImage={() => selectedImage(largeImageURL, tags)}
      />
    ))}
  </ul>
);
