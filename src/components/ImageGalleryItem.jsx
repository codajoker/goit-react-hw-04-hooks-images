import styles from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, onClick, toogleModal }) => {
  return (
    <li
      onClick={() => {
        onClick(image.largeImageURL);
        toogleModal();
      }}
      className={styles.ImageGalleryItem}
    >
      <img
        className={styles.ImageGalleryItemImage}
        src={image.webformatURL}
        alt=""
      />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  image: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  toogleModal: PropTypes.func.isRequired,
};
