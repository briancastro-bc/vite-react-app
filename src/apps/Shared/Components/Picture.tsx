import {
  FC,
  memo,
  useRef,
  useState,
  useEffect,
  ReactNode,
  MouseEvent,
  ChangeEvent,
  PropsWithChildren,
} from 'react';
import { useSnackbar, } from 'notistack';
import { useTranslation, } from 'react-i18next';

import noImage from '@assets/images/noImage.svg'

const MB_IN_KB = 1024;

const MAX_IMAGE_SIZE = MB_IN_KB * 1;

const VALID_IMAGE_TYPES = [
  'image/png', 
  'image/jpeg',
  'image/svg+xml',
  'image/webp',
];

const excededMaxAllowedSize: (fileSize: number) => boolean = (size) => {
  const totalFileSize = size / MB_IN_KB;
  return totalFileSize > MAX_IMAGE_SIZE;
}

const isValidImageType: (imageType: string) => boolean = (type) => {
  return VALID_IMAGE_TYPES.includes(type);
}

type FileProps = {
  fileName?: string;
  size?: number;
  src?: string;
}

type PictureProps = object & PropsWithChildren & {
  className?: string;
  file?: FileProps;
  alt: string;
  isReadonly?: boolean;
  action?: (...args: any) => void;
  icon?: ReactNode;
};

const Picture: FC<PictureProps> = ({
  alt,
  file,
  icon,
  action,
  className,
  isReadonly = true,
}) => {
  const { t, } = useTranslation();

  const imageRef = useRef<HTMLImageElement | null>(null);
  const snackbarRef = useRef<string | number | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [hover, setHover,] = useState<boolean>(false);

  const {
    closeSnackbar,
    enqueueSnackbar,
  } = useSnackbar();

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

  const handleImageSelection: (event: ChangeEvent<HTMLInputElement>) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const uploadedUserFile = e.target?.files![0];
    if (!uploadedUserFile) return;

    if (excededMaxAllowedSize(uploadedUserFile.size)) {
      if (snackbarRef.current) closeSnackbar(snackbarRef.current);

      snackbarRef.current = enqueueSnackbar(t('common.errors.files.size', { 
        size: MAX_IMAGE_SIZE, 
      }), {
        variant: 'error',
      });
    }

    if (!isValidImageType(uploadedUserFile.type)) {
      if (snackbarRef.current) closeSnackbar(snackbarRef.current);

      snackbarRef.current = enqueueSnackbar(t('common.errors.files.format', {
        allowed: VALID_IMAGE_TYPES.join(', '),
      }), {
        variant: 'error',
      });
    }

    const imageUrl = URL.createObjectURL(uploadedUserFile);
    if (imageRef.current) imageRef.current.src = imageUrl;

    if (action) action({
      rawImage: uploadedUserFile,
      imageUrl,
    });
  };

  useEffect(() => {
    return () => {
      if (snackbarRef.current) 
        closeSnackbar(snackbarRef.current);
    }
  }, []);

  return (
    <>
      {isReadonly && (
        <figure
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative flex items-center justify-center rounded-full border border-juridica-gray-100 ${className ?? new String()}`}>
          <img 
            className='w-full h-full object-cover rounded-[inherit]' 
            src={file?.src ?? noImage} 
            alt={alt} 
            ref={imageRef} 
            loading='lazy' />
          {hover && icon && action && (
            <figcaption 
              className='absolute p-3 bottom-0 right-0 flex justify-center items-center rounded-full bg-juridica-400'>
              <label
                htmlFor='image'
                // onClick={(e) => handleClick(e)}>
                className='hover:cursor-pointer'>
                {icon}
                <input
                  ref={imageInputRef}
                  id='image'
                  type='file'
                  className='hidden'
                  accept={VALID_IMAGE_TYPES.join(',')}
                  onChange={handleImageSelection} />
              </label>
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