import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ gallery ,selectedImage}) => (
  <ul>
    {gallery.map(({ id, webformatURL,tags,largeImageURL }) => (
      <ImageGalleryItem
        key={id}
        previewImg={webformatURL}
        tags={tags}
        selectedImage={() => selectedImage(largeImageURL, tags)}
      />
    ))}
  </ul>
);
