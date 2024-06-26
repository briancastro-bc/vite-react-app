import { memo, forwardRef, useState, } from 'react';
import { DatePicker, DatePickerProps, } from '@mui/x-date-pickers/DatePicker';

type OmitDatepickerProps = '';

type CustomDatePickerProps = object & Omit<DatePickerProps<any>, OmitDatepickerProps> & {
  id?: string;
};

const CustomDatePicker = forwardRef<HTMLDivElement, CustomDatePickerProps>(
  (
    {
      label,
      slotProps: { textField, ...slotProps },
      ...args
    },
    ref,
  ) => {
    const [ focus, setFocus, ] = useState<boolean>(false);

    return (
      <div className='flex flex-col gap-y-2'>
        {label && (
          <label
            className={`ml-1 text-sm leading-5 font-primary font-extrabold ${focus ? 'text-juridica-400' : 'text-juridica-gray-500'}`}
            htmlFor={args.id}>
            {label}
          </label>
        )}
        <DatePicker
          slotProps={{
            textField: {
              id: args.id,
              className: `rounded-xl ${args.className ?? new String()}`,
              InputProps: {
                className: `rounded-[inherit]`,
              },
              inputProps: {
                onFocus: () => setFocus(true),
                onBlur: () => setFocus(false),
                className: `rounded-[inherit] py-3 px-3 text-juridica-gray-600 font-medium`
              },
              ...textField,
            },
            ...slotProps,
          }}
          ref={ref}
          {...args}>
        </DatePicker>
      </div>
    );
  }
);

const MemorizeCustomDatePicker = memo(CustomDatePicker);

export default MemorizeCustomDatePicker;