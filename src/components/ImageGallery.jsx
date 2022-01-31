import styles from './ImageGallery.module.css';
import { ImageGalleryItem } from './ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ arrayImage, onClick, toogleModal }) => {
  return (
    <>
      <ul className={styles.ImageGallery}>
        {arrayImage.map(image => {
          return (
            <ImageGalleryItem
              toogleModal={toogleModal}
              onClick={onClick}
              key={image.id}
              image={image}
            ></ImageGalleryItem>
          );
        })}
      </ul>
    </>
  );
};
ImageGallery.propTypes = {
  arrayImage: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  toogleModal: PropTypes.func.isRequired,
};
