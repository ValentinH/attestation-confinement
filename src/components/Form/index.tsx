import { Button, CircularProgress, IconButton, Typography } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
import classnames from 'classnames'
import { Checkboxes } from 'mui-rff'
import React from 'react'
import { Form } from 'react-final-form'
import useLocalStorageState from 'use-local-storage-state'

import { FormData, PersonalData, Reason } from '#src/types'

import EditInfoDialog from '../EditInfoDialog'
import HelpDialog from '../HelpDialog'
import useStyles from './styles'

const initialValues: Record<Reason, boolean> = {
  achats: false,
  convocation: false,
  enfants: false,
  famille: false,
  handicap: false,
  missions: false,
  sport_animaux: false,
  sante: false,
  travail: false,
}
const labels: Record<Reason, string> = {
  achats: 'Achats',
  convocation: 'Convocation judiciaire/administrative',
  enfants: 'École',
  famille: `Motif familial / garde d'enfants`,
  handicap: 'Situation de handicap',
  missions: `Missions d'intérêt général`,
  sport_animaux: 'Promenade / Sport',
  sante: 'Santé',
  travail: 'Travail / Études',
}

const rawData: Array<{ label: string; value: Reason }> = [
  { label: labels.achats, value: 'achats' },
  { label: labels.convocation, value: 'convocation' },
  { label: labels.enfants, value: 'enfants' },
  { label: labels.famille, value: 'famille' },
  { label: labels.handicap, value: 'handicap' },
  { label: labels.missions, value: 'missions' },
  { label: labels.sport_animaux, value: 'sport_animaux' },
  { label: labels.sante, value: 'sante' },
  { label: labels.travail, value: 'travail' },
]
const checkboxData = rawData.sort((a, b) => a.label.localeCompare(b.label))

type Props = {
  onSubmit: (personalData: PersonalData, selectedReasons: string[]) => Promise<void>
}

function FormComponent({ onSubmit }: Props) {
  const classes = useStyles()
  const [personalData, setPersonalData] = useLocalStorageState<PersonalData | null>(
    'info-perso',
    null
  )
  const [helpReason, setHelpReason] = React.useState<Reason | null>(null)
  const [submitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setSuccess] = React.useState(false)

  const onPersonalDataSubmit = (data: PersonalData) => {
    setPersonalData(data)
  }

  const onFormSubmit = async (values: FormData) => {
    if (!personalData) {
      return
    }

    const selectedReasons = Object.keys(values).reduce<string[]>((array, key) => {
      //  @ts-expect-error key is fine
      if (values[key]) {
        return [...array, key]
      }
      return array
    }, [])

    setIsSubmitting(true)
    try {
      await onSubmit(personalData, selectedReasons)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (e) {
      alert('quelque chose a mal tourné')
    }
    setIsSubmitting(false)
  }

  return (
    <>
      <EditInfoDialog open={personalData === null} onSubmit={onPersonalDataSubmit} />
      <HelpDialog
        open={!!helpReason}
        onClose={() => setHelpReason(null)}
        reason={helpReason}
        title={helpReason ? labels[helpReason] : ''}
      />
      <Form
        onSubmit={onFormSubmit}
        initialValues={initialValues}
        render={({ handleSubmit, values }) => {
          const isEmpty = Object.values(values).every((v) => !v)
          return (
            <form onSubmit={handleSubmit} noValidate className={classes.form}>
              {checkboxData.map((checkbox) => (
                <div className={classes.reasonRow}>
                  <Checkboxes key={checkbox.value} name={checkbox.value} required data={checkbox} />
                  <IconButton
                    onClick={() => setHelpReason(checkbox.value)}
                    aria-label={`Aide pour ${checkbox.label}`}
                  >
                    <HelpIcon />
                  </IconButton>
                </div>
              ))}

              <div className={classes.buttons}>
                <Button
                  fullWidth
                  color="secondary"
                  onClick={() => {
                    const isSure = window.confirm('Êtes-vous sûr?')
                    if (isSure) {
                      setPersonalData(null)
                    }
                  }}
                >
                  Supprimer mes données
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  fullWidth
                  disabled={isEmpty || submitting}
                  className={classnames(classes.submit, isSuccess && classes.submitSuccess)}
                  size="large"
                >
                  Créer l&apos;attestation
                  {submitting && <CircularProgress size={24} className={classes.submitProgress} />}
                </Button>
                {isSuccess && (
                  <Typography variant="subtitle1" align="center" className={classes.successText}>
                    Votre attestation a été téléchargée
                  </Typography>
                )}
              </div>
            </form>
          )
        }}
      />
    </>
  )
}

export default FormComponent
