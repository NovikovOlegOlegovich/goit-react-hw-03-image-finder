import { ButtonLoadeMore } from './Button.styled';

const Button = ({ handleClick }) => {
  return (
    <ButtonLoadeMore type="button" onClick={handleClick}>
      Load More
    </ButtonLoadeMore>
  );
};
export default Button;
