import { IMGGalleryItem } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({
  webformatURL,
  id,
  handleClickOnImg,
  largeImageURL,
}) => {
  console.log(typeof id);
  return (
    <IMGGalleryItem key={id} onClick={() => handleClickOnImg(largeImageURL)}>
      <img src={webformatURL} alt="" />
    </IMGGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  handleClickOnImg: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
