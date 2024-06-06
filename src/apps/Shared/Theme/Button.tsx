import {
  memo,
  forwardRef,
} from 'react';

import Button, { ButtonProps, } from '@mui/material/Button';

import Loading from '@mui/icons-material/Loop';

type OmitButtonProps = '';

type CustomButtonProps = object & Omit<ButtonProps, OmitButtonProps> & {
  loading?: boolean;
};

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>((
  {
    children,
    loading = false,
    ...args
  },
  ref,
) => {
  return (
    <Button
      {...args}
      className={`text-base rounded-xl normal-case font-primary font-semibold py-3 ${args.className}`}
      ref={ref}>
      {loading && (
        <Loading 
          className='animate-spin'/>
      )}
      {!loading && children}
    </Button>
  );
});

const MemorizeCustomButton = memo(CustomButton);

export default MemorizeCustomButton;