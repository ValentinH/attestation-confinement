import { Button, IconButton } from '@material-ui/core'
import HelpIcon from '@material-ui/icons/Help'
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
  enfants: 'Enfants',
  famille: 'Motif familial impérieux',
  handicap: 'Situation de handicap',
  missions: `Missions d'intérêt général`,
  sport_animaux: 'Promenade',
  sante: 'Santé',
  travail: 'Travail',
}

const checkboxData: Array<{ label: string; value: Reason }> = [
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

type Props = {
  onSubmit: (personalData: PersonalData, selectedReasons: string[]) => void
}

function FormComponent({ onSubmit }: Props) {
  const classes = useStyles()
  const [personalData, setPersonalData] = useLocalStorageState<PersonalData | null>(
    'info-perso',
    null
  )
  const [helpReason, setHelpReason] = React.useState<Reason | null>(null)

  const onPersonalDataSubmit = (data: PersonalData) => {
    setPersonalData(data)
  }

  const onFormSubmit = (values: FormData) => {
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

    onSubmit(personalData, selectedReasons)
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
                  disabled={isEmpty}
                  className={classes.submit}
                >
                  Créer l&apos;attestation
                </Button>
              </div>
            </form>
          )
        }}
      />
    </>
  )
}

export default FormComponent