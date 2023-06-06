import { SkeletonMessage } from './Skeleton.styled';

const Skeleton = ({ status }) => {
  if (status === 'rejected') {
    return (
      <SkeletonMessage>No images found for your search query</SkeletonMessage>
    );
  }
};

export default Skeleton;
