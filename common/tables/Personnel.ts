export enum Gender {
    M = 'M',
    F = 'F'
}

export interface Personnel {
    NoPersonnel :string,
    Noclinique :string,
    nom :string,
    adresse :string,
    NumTelephone :string, 
    DateNaissance :string ,
    sex       :Gender,
    NAS :number, 
    salaire: number ,
    fonction :string
}