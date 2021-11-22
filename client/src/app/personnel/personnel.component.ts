import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Personnel } from "../../../../common/tables/Personnel";
// import { Animal } from "../../../../common/tables/Animal";
// import { cliniquePK } from "../../../../common/tables/cliniquePK";
import { CommunicationService } from "../communication.service";
import { CliniquePks } from '../../../../common/tables/HotelPK';

@Component({
  selector: "app-Personnel",
  templateUrl: "./personnel.component.html",
  styleUrls: ["./personnel.component.css"],
})

export class PersonnelComponent implements OnInit {
  public NoCliniques: string[] = [];
  public personels: Personnel[] = [];
  public duplicateError: boolean = false;
  public invalidCliniquePK: boolean = false;
  public selectedClinique = "1";

  @ViewChild("NoPersonel") public Nopersonel: ElementRef;
  @ViewChild("nom") public newName: ElementRef;
  @ViewChild("adresse") public newAdresse: ElementRef;
  @ViewChild("telephone") public telephone: ElementRef;
  @ViewChild("dateNaissance") public dateNaissance: ElementRef;
  @ViewChild("NAS") public NAS: ElementRef;
  @ViewChild("sexe") public sexe: ElementRef;
  @ViewChild("fonction") public fonction: ElementRef;
  @ViewChild("salaire") public salaire: ElementRef;

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.communicationService.getcliniquePKs().subscribe((keys: CliniquePks[]) => {
      //this.NoCliniques = keys;

      for (const str of keys) {
       this.NoCliniques.push(str.Noclinique)
     }
      this.getPersonnels();
      console.log(this.NoCliniques);
    });
  }

  public updateSelectedClinique(cliniqueID: any) {
    this.selectedClinique = this.NoCliniques[cliniqueID];
console.log(this.selectedClinique)
    this.getPersonnels();
    this.refresh();
  }

  public getPersonnels(): void {
    this.communicationService
      .filterStaffByClinique(this.selectedClinique)
      .subscribe((personels: Personnel[]) => {
        this.personels = personels;
      });
  }

  private refresh() {
    this.getPersonnels();
    this.Nopersonel.nativeElement.innerText = "";
    this.newName.nativeElement.innerText = "";
    this.newAdresse.nativeElement.innerText = "";
    this.dateNaissance.nativeElement.innerText = "";
    this.sexe.nativeElement.innerText = "";
    this.NAS.nativeElement.innerText = "";
    this.salaire.nativeElement.innerText = "";
    this.fonction.nativeElement.innerText = "";
  }

  public changeName(event: any, i: number): void {
   const editField = event.target.textContent;
   this.personels[i].nom = editField;
  }

  public changeSalary(event: any, i: number): void {
   const editField = event.target.textContent;
   this.personels[i].salaire = editField;

  }

  public changeTelephone(event: any, i: number): void {
    const editField = event.target.textContent;
    this.personels[i].NumTelephone = editField;
  }

  public changeAdresse(event: any, i: number): void {
    const editField = event.target.textContent;
    this.personels[i].adresse = editField;
  }

  public changeNAS(event: any, i: number): void {
    const editField = event.target.textContent;
    this.personels[i].NAS = editField;
  }

  public changeFonction(event: any, i: number): void {
    const editField = event.target.textContent;
    this.personels[i].fonction = editField;
  }

  public changeSexe(event: any, i: number): void {
    const editField = event.target.textContent;
    this.personels[i].sex = editField;
  }

  public changeDateDeNaissance(event: any, i: number): void {
    const editField = event.target.textContent;
    this.personels[i].DateNaissance = editField;
  }

  public deletePersonnel(cliniqueNb: string, PersonnelNb: string) {
    this.communicationService
      .deletePersonnel(cliniqueNb, PersonnelNb)
      .subscribe((res: any) => {
        this.refresh();
      });
  }

  public insertPersonnel(): void {
    const personel: Personnel = {
            NoPersonnel : this.Nopersonel.nativeElement.innerText,
            Noclinique : this.selectedClinique,
            nom : this.newName.nativeElement.innerText,
            adresse : this.newAdresse.nativeElement.innerText,
            NumTelephone : this.telephone.nativeElement.innerText,
            DateNaissance : this.dateNaissance.nativeElement.innerText,
            sex       : this.sexe.nativeElement.innerText,
            NAS : parseInt(this.NAS.nativeElement.innerText),
            salaire: parseInt(this.salaire.nativeElement.innerText ),
            fonction : this.fonction.nativeElement.innerText
    };
    this.communicationService.insertStaff(personel).subscribe((res: number) => {
      this.refresh();
    });
  }

  public updatePersonnel(i: number) {
    this.communicationService
      .updatePersonnel(this.personels[i])
      .subscribe((res: any) => {
        this.refresh();
      });
  }
}
