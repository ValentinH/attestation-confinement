export type PersonalData = {
  address: string
  birthday: string
  city: string
  firstname: string
  lastname: string
  placeofbirth: string
  zipcode: string
}

export type PdfData = PersonalData & {
  datesortie: string
  heuresortie: string
  'ox-achats': string
  'ox-convocation': string
  'ox-enfants': string
  'ox-famille': string
  'ox-handicap': string
  'ox-missions': string
  'ox-sante': string
  'ox-sport_animaux': string
  'ox-travail': string
}

export type FormData = {
  reasons: string[]
}

export type Reason =
  | 'achats'
  | 'convocation'
  | 'enfants'
  | 'famille'
  | 'handicap'
  | 'missions'
  | 'sport_animaux'
  | 'sante'
  | 'travail'
