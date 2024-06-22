import { 
  memo, 
  useRef,
  useState,
  forwardRef,
  MouseEvent, 
} from 'react';
import { useSnackbar, } from 'notistack';
import { useTranslation } from 'react-i18next';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import Copy from '@mui/icons-material/ContentPaste';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
  const snackbarRef = useRef<string | number | null>(null);

  const { t, } = useTranslation();

  const { 
    closeSnackbar,
    enqueueSnackbar, 
  } = useSnackbar();

  const [focus, setFocus,] = useState<boolean>(false);
  const [showPassword, setShowPassword,] = useState<boolean>(false);

  const handleClipboard: (event: MouseEvent) => Promise<void> = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const rawInputElement = (
      inputRef
        .current
        ?.getElementsByTagName('input')[0] as HTMLInputElement
    );

    const value = rawInputElement?.defaultValue ?? rawInputElement?.value ?? '';

    await navigator
      .clipboard
      .writeText(value);

    const cliptText = await navigator
      .clipboard
      .readText();

    if (snackbarRef.current) closeSnackbar(snackbarRef.current)

    snackbarRef.current = enqueueSnackbar(t('common.messages.copy', { message: cliptText, }), {
      variant: 'default',
    });

    if (onClipboardCopy) onClipboardCopy(cliptText);
  };

  const handleShowPassword: (event: MouseEvent) => void = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const rawInputElement = (
      inputRef
        .current
        ?.getElementsByTagName('input')[0] as HTMLInputElement
    );

    setShowPassword((previousState) => {
      if (!previousState) rawInputElement.type = 'text';
      else rawInputElement.type = 'password';

      return !previousState;
    });
  };

  return (
    <div className='flex flex-col gap-y-2'>
      {label && (
        <label
          className={`ml-1 text-sm leading-5 font-primary font-extrabold ${focus ? 'text-juridica-400' : 'text-juridica-gray-500'}`}
          htmlFor={args.id}>
          {label}
        </label>
      )}
      <TextField 
        {...args}
        id={args.id}
        disabled={args.disabled ?? !editable}
        className={`rounded-xl ${args.className ?? new String()}`}
        InputProps={{
          ...args.InputProps,
          ...(args.disabled && clipboard && args.type !== 'password' && {
            endAdornment: <span 
              className='z-20 p-1 rounded-md border border-juridica-gray-400 text-juridica-gray-400 hover:cursor-pointer'
              onClick={handleClipboard}>
              <Copy className='text-xl' />
            </span>,
          }),
          ...(args.type === 'password' && {
            endAdornment: <>
              {showPassword && (
                <span className='hover:cursor-pointer' onClick={handleShowPassword}>
                  <VisibilityOff className='text-juridica-gray-400' />
                </span>
              )}
              {!showPassword && (
                <span className='hover:cursor-pointer' onClick={handleShowPassword}>
                  <Visibility className='text-juridica-gray-400' />
                </span>
              )}
            </>
          }),
          ref: inputRef,
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