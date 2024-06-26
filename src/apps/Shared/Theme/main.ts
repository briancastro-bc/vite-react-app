import {
  createTheme,
  Icon,
  Chip,
  MenuItem,
} from '@mui/material';

import Button from './Button.tsx';
import Snackbar from './Snackbar.tsx';
import Checkbox from './Checkbox.tsx';
import TextField from './TextField.tsx';
import Typography from './Typography.tsx';
import DatePicker from './Datepicker.tsx';

export const customTheme = createTheme({
  palette: {
    primary: {
      '50': '#eef5ff',
      '100': '#dae7ff',
      '200': '#bdd6ff',
      '300': '#90bcff',
      '400': '#5493ff', // main
      '500': '#3571fc',
      '600': '#1f50f1',
      '700': '#173bde',
      '800': '#1932b4',
      '900': '#1a2f8e',
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
  Chip,
  Button,
  Snackbar,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
  DatePicker,
}