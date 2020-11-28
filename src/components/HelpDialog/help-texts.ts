import { Reason } from '#src/types'

const helpTexts: Record<Reason, string> = {
  achats_culturel_cultuel:
    ' Déplacements pour se rendre dans un établissement culturel autorisé ou un lieu de culte ; déplacements pour effectuer des achats de biens, pour des services dont la fourniture est autorisée, pour les retraits de commandes et les livraisons à domicile ;',
  convocation:
    'Convocations judiciaires ou administratives et déplacements pour se rendre dans un service public ;',
  enfants:
    'Déplacements pour chercher les enfants à l’école et à l’occasion de leurs activités périscolaires ;',
  famille:
    'Déplacements pour motif familial impérieux, pour l’assistance aux personnes vulnérables et précaires ou la garde d’enfants ;',
  handicap: 'Déplacements des personnes en situation de handicap et leur accompagnant ;',
  missions:
    'Participation à des missions d’intérêt général sur demande de l’autorité administrative ;',
  sport_animaux:
    'Déplacements en plein air ou vers un lieu de plein air, sans changement du lieu de résidence, dans la limite de trois heures quotidiennes et dans un rayon maximal de vingt kilomètres autour du domicile, liés soit à l’activité physique ou aux loisirs individuels, à l’exclusion de toute pratique sportive collective et de toute proximité avec d’autres personnes, soit à la promenade avec les seules personnes regroupées dans un même domicile, soit aux besoins des animaux de compagnie ;',
  sante:
    'Consultations, examens et soins ne pouvant être assurés à distance et achats de médicaments ;',
  travail:
    'Déplacements entre le domicile et le lieu d’exercice de l’activité professionnelle ou un établissement d’enseignement ou de formation ; déplacements professionnels ne pouvant être différés ; déplacements pour un concours ou un examen ;',
}

export default helpTexts
