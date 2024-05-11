import { 
  FC, 
  memo, 
} from 'react';

type SkeletonProps = object & {
  width?: number | string;
  height?: number | string;
  animation?: string;
}

const Skeleton: FC<SkeletonProps> = memo(({
  width,
  height,
  animation,
}) => {
  
  
  return (
    <div>

    </div>
  );
});

export default Skeleton;