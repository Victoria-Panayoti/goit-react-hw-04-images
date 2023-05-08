import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { ModalBtn, ModalImg } from './Modal.styled';

const customStyles = {
  overlay: {
    zIndex: '998',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    zIndex:'999'
  },
};
Modal.setAppElement('#root');

export const ImageModal = ({ largeImageURL, tags, isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <ModalImg src={largeImageURL} alt={tags} />
      <ModalBtn type="button" onClick={onClose}>
        Close
      </ModalBtn>
    </Modal>
  );
};

ImageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
