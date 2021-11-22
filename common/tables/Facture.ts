import { Proprietaire } from './Proprietaire';
import { Examen } from './Examen';
import { Animal } from './Animal';
import { Personnel } from './Personnel';
import { Prescription } from './Prescription';
export interface Facture{
  proprietaire: Proprietaire,
  animal: Animal,
  examen: Examen,
  veterinaie: Personnel,
  moyenDePayement: string,
  traitement:Prescription[]
}