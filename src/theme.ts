import blue from '@material-ui/core/colors/blue'
import deepOrange from '@material-ui/core/colors/deepOrange'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: deepOrange[500],
    },
  },
})

export default theme
