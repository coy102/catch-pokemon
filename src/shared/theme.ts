import { createMuiTheme } from '@material-ui/core/styles';
import { red, lightBlue } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: lightBlue[300],
    },
    secondary: {
      main: '#9575cd',
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
