import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Clinique } from '../../../common/tables/Clinique';
//import { Proprietaire } from "../../../common/tables/Proprietaire";
import { Animal } from "../../../common/tables/Animal";
import { Personnel } from "../../../common/tables/Personnel";
//import { cliniquePK } from '../../../common/tables/cliniquePK';
import { CliniquePks } from '../../../common/tables/HotelPK';
import { ProprietairePK } from '../../../common/tables/ProprietairePKs';
import { Prescription } from '../../../common/tables/Prescription';
import { AnimalPk } from '../../../common/tables/AnimalPks';
import { Proprietaire } from "../../../common/tables/Proprietaire";


@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listners: any = new Subject<any>();

  public listen(): Observable<any> {
    return this._listners.asObservable();
  }

  public filter(filterBy: string): void {
    this._listners.next(filterBy);
  }

  public getCliniques(): Observable<Clinique[]> {
    return this.http
      .get<Clinique[]>(this.BASE_URL + "/cliniques")
      .pipe(catchError(this.handleError<Clinique[]>("getcliniques")));
  }

  public insertClinique(clinique: Clinique): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/cliniques/insert", clinique)
      .pipe(catchError(this.handleError<number>("insertclinique")));
  }

  public updateClinique(clinique: Clinique): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/cliniques/update", clinique)
      .pipe(catchError(this.handleError<number>("updateclinique")));
  }

  public deleteClinique(cliniqueNb: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/cliniques/delete/" + cliniqueNb, {})
      .pipe(catchError(this.handleError<number>("deleteclinique")));
  }


  public getcliniquePKs(): Observable<CliniquePks[]> {
    return this.http
      .get<CliniquePks[]>(this.BASE_URL + "/cliniques/Noclinique")
      .pipe(catchError(this.handleError<CliniquePks[]>("getcliniquePKs")));
  }



  public getStaffs(): Observable<Personnel[]> {
    return this.http
      .get<Personnel[]>(this.BASE_URL + `/personels`)
      .pipe(catchError(this.handleError<Personnel[]>("getStaffs")));
  }

  public filterStaffByClinique(noclinique: string): Observable<Personnel[]> {
    return this.http
      .get<Personnel[]>(this.BASE_URL + `/personels/${noclinique}`)
      .pipe(catchError(this.handleError<Personnel[]>("getStaffs")));
  }

  public insertStaff(personel: Personnel): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/personels/insert", personel)
      .pipe(catchError(this.handleError<number>("inserclinique")));
  }

  public updatePersonnel(personel: Personnel): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/personels/update", personel)
      .pipe(catchError(this.handleError<number>("updatePersonnel")));
  }

  public deletePersonnel(cliniqueNb: string, PersonnelNb: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + `/personels/delete/${cliniqueNb}/${PersonnelNb}`, {})
      .pipe(catchError(this.handleError<number>("deletePersonnel")));
  }

  public getAllAnimals(): Observable<Animal[]>{
    return this.http
      .get<Animal[]>(this.BASE_URL + `/animals`)
      .pipe(catchError(this.handleError<Animal[]>("getAllAnimals")))
  }

  public deleteAnimal(noanimal:string,cliniqueNb: string, Noproprietaire: string): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + `/animals/delete/${noanimal}/${cliniqueNb}/${Noproprietaire}`, {})
      .pipe(catchError(this.handleError<number>("deletePersonnel")));
  }

  public getProprietairePks(): Observable<ProprietairePK[]>{

    const res =this.http
      .get<ProprietairePK[]>(this.BASE_URL + "/proprietaires/Noproprietaire")
      .pipe(catchError(this.handleError<ProprietairePK[]>("deletePersonnel")));
    console.log(res);
    return res
  }

  public getAnimalsByKeys(Noclinique: string, Noproprietaire: string): Observable<Animal[]>{
    return this.http.get<Animal[]>(this.BASE_URL+`/animals/${Noclinique}/${Noproprietaire}`).pipe(catchError(this.handleError<Animal[]>("filter Animal")))
  }

  public insertAnimal(animal: Animal): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/animals/insert", animal)
      .pipe(catchError(this.handleError<number>("insertclinique")));
  }

  public updateAnimals(animal: Animal): Observable<number>{
    return this.http
    .put<number>(this.BASE_URL + "/animals/update", animal)
    .pipe(catchError(this.handleError<number>("updatePersonnel")));
  }

  public getAnimalsByName(nom: string): Observable<Animal[]>{
    return this.http.get<Animal[]>(this.BASE_URL+`/animals/${nom}`).pipe(catchError(this.handleError<Animal[]>("filter Animal")))
  }

  public getTraitement(Noanimal: string): Observable<Prescription[]>{
    return this.http.get<Prescription[]>(this.BASE_URL+`/traitements/${Noanimal}`).pipe(catchError(this.handleError<Prescription[]>("filter Animal")))
  }

  public getAnimalsPks(): Observable<AnimalPk[]>{

    const res =this.http
      .get<AnimalPk[]>(this.BASE_URL + "/animals/NoAnimal/noanimals/allNumeroanimal")
      .pipe(catchError(this.handleError<AnimalPk[]>("deletePersonnel")));
    return res
  }

  public getProprietaire(noanimal: string, noclinique: string): Observable<Proprietaire[]>{
    return this.http
      .get<Proprietaire[]>(this.BASE_URL + `/proprietaires/${noanimal}/${noclinique}`)
      .pipe(catchError(this.handleError<Proprietaire[]>("filter Animal")))
  }

  public getTables(name: string): Observable<any[]>{
    return this.http
      .get<any[]>(this.BASE_URL + `/tables/${name}`)
      .pipe(catchError(this.handleError<any[]>("getTable")))
  }
/*
  public getGuests(cliniqueNb: string, PersonnelNb: string): Observable<Guest[]> {
    return this.http
      .get<Guest[]>(this.BASE_URL + `/guests/${cliniqueNb}/${PersonnelNb}`)
      .pipe(catchError(this.handleError<Guest[]>("getGuests")));
  }*/

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
