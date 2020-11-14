import { makeStyles } from '@material-ui/core'

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
}))

export default useStyles
