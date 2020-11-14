import { Container, Link, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

import Form from '#src/components/Form'
import { downloadBlob } from '#src/pdf/blob-utils'
import { generatePdf } from '#src/pdf/pdf-util'
import { PdfData, PersonalData } from '#src/types'

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
}))

function Home() {
  const classes = useStyles()

  const onSubmit = (personalData: PersonalData, selectedReasons: string[]) => {
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
    downloadPdf(profile, selectedReasons)
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography component="h1" variant="h5" gutterBottom align="center">
        Attestation de sortie
      </Typography>
      <Form onSubmit={onSubmit} />
      <Typography variant="caption" align="center">
        Fait avec{' '}
        <span role="img" aria-label="amour">
          ❤️
        </span>{' '}
        &nbsp;par <Link href="https://valentin-hervieu.fr">Valentin</Link> - (
        <Link href="https://github.com/ValentinH/attestation-confinement">code source</Link>)
      </Typography>
    </Container>
  )
}

export default Home
