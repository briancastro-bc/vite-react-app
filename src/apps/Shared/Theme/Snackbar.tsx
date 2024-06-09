import { 
  memo,
  forwardRef,
} from 'react';
import Snackbar, { SnackbarProps, } from '@mui/material/Snackbar';

type CustomSnackbarProps = object & SnackbarProps;

const CustomSnackbar = forwardRef<HTMLDivElement, CustomSnackbarProps>((
  {
    style,
    children,
    ...args
  },
  ref,
) => {
  return (
    <Snackbar
      {...args}
      style={style}
      ref={ref}>
      {children}
    </Snackbar>
  );
});

const MemorizeCustomSnackbar = memo(CustomSnackbar);

export default MemorizeCustomSnackbar;