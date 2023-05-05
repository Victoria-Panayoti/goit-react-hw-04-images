export const ImageGalleryItem = ({ tags, previewImg, selectedImage }) => {
  return (
    <li>
      <img src={previewImg} alt={tags} onClick={selectedImage} />
    </li>
  );
};
