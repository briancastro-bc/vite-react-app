import { FC, memo, } from 'react';

type FullScreenSkeletonProps = object;

const FullScreenSkeleton: FC<FullScreenSkeletonProps> = memo(() => {
  return (
    <div className='h-screen min-h-full w-full'>
      
    </div>
  );
});

export default FullScreenSkeleton;