import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import orange from '@material-ui/core/colors/orange';
const muiTheme = {
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: blueGrey[900],
    },
    secondary: orange,
  },
  overrides: {
    MuiToolbar: {
      regular: {
        minHeight: 56,
      },
    },
  },
};
export const theme = createMuiTheme(muiTheme);
export default theme;
