import { createMuiTheme } from '@material-ui/core/styles';
import { red, lightBlue, green } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: lightBlue[300],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f3f3f3',
    },
  },
  overrides: {
    MuiCard: {
      root: {
        boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px',
        borderRadius: 5,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
    MuiBottomNavigation: {
      root: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
    },
  },
});

export default theme;
