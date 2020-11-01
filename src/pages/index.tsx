import { Button, Container, makeStyles, Typography } from '@material-ui/core'
import { Checkboxes, CheckboxData } from 'mui-rff'
import React from 'react'
import { Form } from 'react-final-form'
import useLocalStorageState from 'use-local-storage-state'

import EditInfoDialog from '#src/components/EditInfoDialog'
import { downloadBlob } from '#src/pdf/blob-utils'
import { generatePdf } from '#src/pdf/pdf-util'
import { FormData, PdfData, PersonalData } from '#src/types'

const reasons = {
  'ox-achats': 'achats',
  'ox-convocation': 'convocation',
  'ox-enfants': 'enfants',
  'ox-famille': 'famille',
  'ox-handicap': 'handicap',
  'ox-missions': 'missions',
  'ox-sante': 'sante',
  'ox-sport_animaux': 'sport_animaux',
  'ox-travail': 'travail',
}

const downloadPdf = async (profile: PdfData, selectedReasons: string[]) => {
  const concatenatedReasons = selectedReasons.join(', ')
  const pdfBlob = await generatePdf(profile, concatenatedReasons, '/certificate.pdf')

  const creationInstant = new Date()
  const creationDate = creationInstant.toLocaleDateString('fr-CA')
  const creationHour = creationInstant
    .toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    .replace(':', '-')

  downloadBlob(pdfBlob, `attestation-${creationDate}_${creationHour}.pdf`)
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
  form: {
    marginTop: theme.spacing(1),
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  buttons: {
    marginTop: 'auto',
  },
  submit: {
    marginTop: theme.spacing(2),
  },
}))

const initialValues = {
  reasons: [],
}

const checkboxData: CheckboxData[] = [
  { label: 'Achats', value: 'achats' },
  { label: 'Convocation judiciaire/administrative', value: 'convocation' },
  { label: 'Enfants', value: 'enfants' },
  { label: 'Famille', value: 'famille' },
  { label: 'Handicap', value: 'handicap' },
  { label: 'Missions', value: 'missions' },
  { label: 'Promenade', value: 'sport_animaux' },
  { label: 'Santé', value: 'sante' },
  { label: 'Travail', value: 'travail' },
]

function Home() {
  const classes = useStyles()
  const [personalData, setPersonalData] = useLocalStorageState<PersonalData | null>(
    'info-perso',
    null
  )

  const onPersonalDataSubmit = (data: PersonalData) => {
    setPersonalData(data)
  }

  const onFormSubmit = (values: FormData) => {
    if (!personalData) {
      return
    }

    const profile: PdfData = {
      ...personalData,
      ...reasons,
      birthday: new Date(personalData.birthday).toLocaleDateString('fr-FR'),
      datesortie: new Date(Date.now()).toLocaleDateString('fr-FR'),
      heuresortie: new Date(Date.now()).toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
    downloadPdf(profile, values.reasons)
  }

  const validate = (values: FormData) => {
    if (!values.reasons || values.reasons.length === 0) {
      return { reasons: 'Vous avez oubliez la raison' }
    }
    return undefined
  }

  return (
    <Container className={classes.root}>
      <EditInfoDialog open={personalData === null} onSubmit={onPersonalDataSubmit} />
      <Typography component="h1" variant="h5" gutterBottom>
        Attestation de sortie
      </Typography>
      <Typography component="h3" variant="body1" gutterBottom>
        Bonjour {personalData?.firstname || ''}
      </Typography>
      <Form
        onSubmit={onFormSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} noValidate className={classes.form}>
            <Checkboxes
              label="Quelle est la raison de votre sortie?"
              name="reasons"
              required
              data={checkboxData}
            />
            <div className={classes.buttons}>
              <Button
                variant="contained"
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
                className={classes.submit}
              >
                Créer l&apos;attestation
              </Button>
            </div>
          </form>
        )}
      />
    </Container>
  )
}

export default Home
