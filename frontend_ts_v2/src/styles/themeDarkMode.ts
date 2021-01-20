import { createMuiTheme, responsiveFontSizes, } from '@material-ui/core/styles'
import { green, red } from '@material-ui/core/colors'


let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#252525',
      main: '#1b1b1b',
      dark: '#313131',
      contrastText: '#1f1f1f'
    },
    secondary: {
      light: '#2c2f48',
      main: '#040521',
      dark: '#000000',
      contrastText: '#77bfed'
    },
    success: {
      main: green[500],
      light: green[100]
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
    fontFamily: ['Rubik', 'Karla', 'serif', 'Roboto'].join(','),
    h1: {
      fontFamily: 'Rubik',
      fontSize: '3rem',
      fontWeight: 500,
      lineHeight: '1.167',
      textTransform: 'lowercase',
      letterSpacing: '-3.5px',
      color: "#77bfed"
    },
    //h2 === heroText
    h2: {
      fontFamily: 'Rubik',
      fontSize: 'calc(2rem + 4vw);',
      fontWeight: 500,
      lineHeight: '1.167',
      letterSpacing: '-3.5px',
      textTransform: 'lowercase',
      color: "#77bfed"
    },
    h3: {
      fontFamily: 'Roboto',
      fontSize: 'calc(1em / 16 * 15)',
      lineHeight: 'calc(24 / 15)',
      textTransform: 'uppercase',
      color: "#77bfed"
    },
    body2: {
      fontFamily: 'Karla',
      fontSize: '1.1rem',
      lineHeight: 'calc(24 / 16)',
      color: "#77bfed"
    },
    subtitle1: {
      fontFamily: 'Karla',
      fontSize: '.8rem'
    }
  }
})

// theme = responsiveFontSizes(theme)

// theme.typography.h3 = {
//   fontSize: '1.2rem',
//   '@media (min-width:600px)': {
//     fontSize: '1.5rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '2.4rem',
//   },
// };

export default theme
