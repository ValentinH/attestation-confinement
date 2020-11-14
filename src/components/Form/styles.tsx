import { makeStyles } from '@material-ui/core'
import green from '@material-ui/core/colors/green'

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  reasonRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > div': {
      flex: 1,
    },
  },
  buttons: {
    marginTop: theme.spacing(4),
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  error: {
    color: theme.palette.error.main,
  },
  successText: {
    color: green[500],
    marginTop: theme.spacing(1),
  },
  submitSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  submitProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

export default useStyles
