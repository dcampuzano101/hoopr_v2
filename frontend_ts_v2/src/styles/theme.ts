import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#fafafa',
      dark: '#edebeb',
      contrastText: '#000000'
    },
    secondary: {
      light: '#2c2f48',
      main: '#040521',
      dark: '#000000',
      contrastText: '#ffffff'
    }
  },

  /*
The typography object comes with 13 variants by default:
h1
h2
h3
h4
h5
h6
subtitle1
subtitle2
body1
body2
button
caption
overline
*/
  typography: {
    fontFamily: ['Rubik', 'Karla', 'serif'].join(','),
    h1: {
      fontFamily: 'Rubik',
      fontSize: '3rem',
      fontWeight: 500,
      lineHeight: '1.167',
      textTransform: 'lowercase',
      letterSpacing: '-3.5px'
    },
    body2: {
      fontFamily: 'Karla',
      fontSize: '1.1rem',
      lineHeight: 'calc(24 / 16)'
    },
    subtitle1: {
      fontFamily: 'Karla',
      fontSize: '.8rem'
    }
  }
})

export default theme
