import {
  FC,
  memo,
  useRef,
  useState,
  MouseEvent,
  PropsWithChildren,
  ReactNode,
} from 'react';

import noImage from '@assets/images/noImage.svg'

type FileProps = {
  fileName: string;
  size: number;
}

type PictureProps = object & PropsWithChildren & {
  className?: string;
  file?: FileProps;
  src?: string;
  alt: string;
  isReadonly?: boolean;
  action?: (...args: Array<unknown>) => void;
  icon?: ReactNode;
};

const Picture: FC<PictureProps> = ({
  src,
  alt,
  icon,
  action,
  className,
  isReadonly = true,
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [hover, setHover,] = useState<boolean>(false);

  const handleMouseEnter: (event: MouseEvent) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setHover(true);
  };

  const handleMouseLeave: (event: MouseEvent) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setHover(false);
  };

  const handleClick: (event: MouseEvent<HTMLSpanElement>) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (action) action(e);
  };

  return (
    <>
      {isReadonly && (
        <figure
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative flex items-center justify-center rounded-full border border-juridica-gray-100 ${className ?? new String()}`}>
          <img 
            className='w-full h-full object-cover rounded-[inherit]' 
            src={src ?? noImage} 
            alt={alt} 
            ref={imageRef} 
            loading='lazy' />
          {hover && icon && action && (
            <figcaption 
              className='absolute p-3 bottom-0 right-0 flex justify-center items-center rounded-full bg-juridica-400'>
              <span className='hover:cursor-pointer' onClick={(e) => handleClick(e)}>
                {icon}
              </span>
            </figcaption>
          )}
        </figure>
      )}
      {!isReadonly && (
        <></>
      )}
    </>
  );
};

const MemorizePicture = memo(Picture);

export default MemorizePicture;