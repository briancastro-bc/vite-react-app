import { 
  forwardRef, 
  FC,
  ForwardedRef, 
} from 'react';

import { Typography, TypographyProps, } from '@mui/material';

type CustomTypographyProps = object & TypographyProps;

const CustomTypography: FC<CustomTypographyProps> = forwardRef((
  {
    children,
    ...args
  },
  ref: ForwardedRef<HTMLSpanElement>,
) => {
  return (
    <Typography 
      {...args}
      ref={ref}>
      {children}
    </Typography>
  );
});

export default CustomTypography;
