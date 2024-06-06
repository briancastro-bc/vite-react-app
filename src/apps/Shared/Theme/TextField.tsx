import { 
  memo, 
  useRef,
  useState,
  forwardRef,
  MouseEvent, 
} from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import Copy from '@mui/icons-material/ContentPaste';

type OmitTextFieldProps = 'fullWidth';

type CustomTextFieldProps = object & Omit<TextFieldProps, OmitTextFieldProps> & {
  editable?: boolean;
  clipboard?: boolean;
  onClipboardCopy?: (...args: Array<unknown>) => unknown;
};

const CustomTextField = forwardRef<HTMLInputElement, CustomTextFieldProps>((
  {
    label,
    children,
    onClipboardCopy,
    editable = true,
    clipboard = false,
    ...args
  },
  ref,
) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [focus, setFocus,] = useState<boolean>(false);

  const handleClipboard: (event: MouseEvent) => Promise<void> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const rawInputElement = (
      (args?.inputRef ?? inputRef)
        .current
        ?.firstElementChild as HTMLInputElement
    ) ?? (
      inputRef
        .current
        ?.getElementsByTagName('input')[0] as HTMLInputElement
    );

    const value = rawInputElement?.value ?? '';

    await navigator
      .clipboard
      .writeText(value);

    const cliptText = await navigator
      .clipboard
      .readText();

    if (onClipboardCopy) onClipboardCopy(cliptText);
  };

  return (
    <div className='flex flex-col gap-y-2'>
      <label
        className={`ml-1 text-sm leading-5 font-primary font-extrabold ${focus ? 'text-juridica-400' : 'text-juridica-gray-500'}`}
        htmlFor={args.id}>
        {label}
      </label>
      <TextField 
        {...args}
        id={args.id}
        disabled={args.disabled ?? !editable}
        className={`rounded-xl ${args.className ?? new String()}`}
        InputProps={{
          ...args.InputProps,
          ...(args.disabled && clipboard && {
            endAdornment: <span 
              className='z-20 p-1 rounded-md border border-juridica-gray-400 text-juridica-gray-400 hover:cursor-pointer'
              onClick={handleClipboard}>
              <Copy className='text-xl' />
            </span>,
          }),
          ref: args?.inputRef ?? inputRef,
          className: `rounded-[inherit] ${args.InputProps?.className ?? new String()}`,
        }}
        inputProps={{
          ...args.inputProps,
          onFocus: () => setFocus(true),
          onBlur: (e) => {
            if (args.onBlur) args?.onBlur(e);
            setFocus(false);
          },
          className: `rounded-[inherit] py-3 px-3 text-juridica-gray-600 font-medium ${args.inputProps?.className ?? new String()}`
        }}
        ref={ref}>
        {children}
      </TextField>
    </div>
  )
});

const MemorizeCustomTextField = memo(CustomTextField);

export default MemorizeCustomTextField;