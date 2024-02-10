export interface Role {
  id: number;
  libelle: string;
  personnel?: Personnel[];
}

export interface Personnel {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  mail: string;
  role: Role;
  etablissement?: Etablissement;
  interventions?: Intervention[];
}

export interface Etablissement {
  id: number;
  nom: string;
  personnel?: Personnel[];
}

export interface Intervention {
  id: number;
  date: Date | string;
  lieu: string;
  factureId?: number;
  etat_facture: string;
  date_facture: Date | string;
  date_integration: Date | string;
  personnel?: Personnel;
  patient: Patient;
  prestations?: Prestation[];
}

export interface Prestation {
  id: number;
  commentaire: string;
  intervention: Intervention;
  soin: Soin;
  bonsObservation?: BonObservation[];
}

export interface CategorieSoin {
  id: number;
  libelle: string;
  parent?: CategorieSoin;
  soins?: Soin[];
}

export interface Soin {
  id: number;
  libelle: string;
  prix: number;
  prestations?: Prestation[];
  categorie?: CategorieSoin;
}

export interface Patient {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  tel: string;
  mail: string;
  interventions?: Intervention[];
}

export interface BonObservation {
  id: number;
  date: Date;
  note: string;
  commentaire: string;
  prestation: Prestation;
}