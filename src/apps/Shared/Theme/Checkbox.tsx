import {
  memo,
  forwardRef,
} from 'react';

import Checkbox, { CheckboxProps, } from '@mui/material/Checkbox';

import {
  Typography,
} from '@theme/main';

type OmitCheckboxProps = 'size';

type CustomCheckboxProps = object & Omit<CheckboxProps, OmitCheckboxProps> & {
  label: string;
  description?: string;
};

const CustomCheckbox = forwardRef<HTMLButtonElement, CustomCheckboxProps>((
  {
    label,
    description,
    ...args
  },
  ref
) => {
  return (
    <div className='flex items-center gap-x-1'>
      <Checkbox
        {...args}
        size='medium'
        ref={ref} />
      <div className='flex flex-col gap-y-1'>
        <Typography
          variant='body1'
          className='text-sm font-bold font-primary'>
          {label}
        </Typography>
        {description && (
          <Typography
            variant='body1'
            className='text-xs font-primary'>
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
});

const MemorizeCustomCheckbox = memo(CustomCheckbox);

export default MemorizeCustomCheckbox;