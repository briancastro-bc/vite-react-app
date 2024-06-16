import { 
  createTheme, 
  Icon,
  MenuItem,
} from '@mui/material';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from '@root/tailwind.config';

import Button from './Button.tsx';
import Snackbar from './Snackbar.tsx';
import Checkbox from './Checkbox.tsx';
import TextField from './TextField.tsx';
import Typography from './Typography.tsx';

const tailwindTheme = resolveConfig(tailwindConfig);

export const customTheme = createTheme({
  palette: {
    primary: {
      ...tailwindTheme.theme.colors['juridica'],
    },
  },
  components: {
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            // borderColor: 
          }
        }
      ]
    },
  }
});

export { 
  Icon,
  Button,
  Snackbar,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
}