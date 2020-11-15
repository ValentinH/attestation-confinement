import DateFnsUtils from '@date-io/date-fns'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Slide,
  Typography,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import { fr } from 'date-fns/locale'
import { TextField, KeyboardDatePicker } from 'mui-rff'
import React from 'react'
import { Form } from 'react-final-form'

import 'date-fns'
import { PersonalData } from '#src/types'

type Props = {
  open: boolean
  onSubmit: (data: PersonalData) => void
}

const requiredMessage = 'Ce champ est obligatoire'

const useStyles = makeStyles((theme) => ({
  field: {
    marginBottom: theme.spacing(2),
  },
}))

const EditInfoDialog = ({ open, onSubmit }: Props) => {
  const classes = useStyles()
  const initialValues = {
    address: '',
    birthday: '',
    city: '',
    firstname: '',
    lastname: '',
    placeofbirth: '',
    zipcode: '',
  }

  const onFormSubmit = (values: PersonalData) => {
    onSubmit(values)
  }

  const validate = (values: PersonalData) => {
    const errors = Object.keys(values).reduce((obj, key) => {
      //  @ts-expect-error key is fine
      if (!values[key]) {
        return {
          ...obj,
          [key]: requiredMessage,
        }
      }
      return obj
    }, {})

    if (Object.keys(errors).length === 0) {
      return undefined
    }
    return errors
  }
  return (
    <Dialog open={open} TransitionComponent={Transition}>
      <DialogTitle disableTypography>
        <Typography variant="h6" component="h2">
          Vos données
        </Typography>
        <Typography variant="caption">
          Ces données seront uniquement enregistrées sur votre appareil afin de ne pas avoir à les
          ressaisir.
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Form
          onSubmit={onFormSubmit}
          initialValues={initialValues}
          validate={validate}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} noValidate id="infos-form">
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={fr}>
                <TextField
                  className={classes.field}
                  variant="outlined"
                  label="Prénom"
                  name="firstname"
                  required
                />
                <TextField
                  className={classes.field}
                  variant="outlined"
                  label="Nom"
                  name="lastname"
                  required
                />
                <KeyboardDatePicker
                  inputVariant="outlined"
                  className={classes.field}
                  label="Date de naissance"
                  name="birthday"
                  required
                  placeholder="jj/mm/yyy"
                  openTo="year"
                  initialFocusedDate="1990-01-01"
                  format="dd/MM/yyyy"
                  disableFuture
                />
                <TextField
                  className={classes.field}
                  variant="outlined"
                  label="Lieu de naissance"
                  name="placeofbirth"
                  required
                />
                <TextField
                  className={classes.field}
                  variant="outlined"
                  label="Adresse"
                  name="address"
                  required
                />
                <TextField
                  className={classes.field}
                  variant="outlined"
                  label="Ville"
                  name="city"
                  required
                />
                <TextField
                  className={classes.field}
                  variant="outlined"
                  label="Code postal"
                  name="zipcode"
                  required
                />
              </MuiPickersUtilsProvider>
            </form>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button
          form="infos-form"
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Enregistrer
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditInfoDialog

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})
