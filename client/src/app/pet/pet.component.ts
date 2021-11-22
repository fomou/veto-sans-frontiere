import { Component, OnInit, ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { CliniquePks } from "../../../../common/tables/HotelPK";
import { ProprietairePK } from "../../../../common/tables/ProprietairePKs";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-pet",
  templateUrl: "./pet.component.html",
  styleUrls: ["./pet.component.css"]
})
export class PetComponent implements OnInit {

  @ViewChild("Animal") public Animal: ElementRef;
  @ViewChild("nom") public nom: ElementRef;
  @ViewChild("espece") public espece: ElementRef;
  @ViewChild("type") public type: ElementRef;
  @ViewChild("dateNaissance") public dateNaissance: ElementRef;
  @ViewChild("DateInscription") public DateInscription: ElementRef;
  @ViewChild("taille") public taille: ElementRef;
  @ViewChild("poids") public poids: ElementRef;
  @ViewChild("etat") public etat: ElementRef;
  @ViewChild("description") public description: ElementRef;
  @ViewChild("nameToSearch") public nameToSearch: ElementRef<HTMLInputElement>;

  public animals: Animal[] = [];
  public cliniqueKeys: string[] = [];
  public proprietaire: string[] = [];
  public selectedClinique: string;
  public selectedOwner: string;

  // private nameTofind:string=""

  public constructor(private communicationService: CommunicationService) { }

  public ngOnInit(): void {

    this.communicationService.getcliniquePKs().subscribe((keys: CliniquePks[]) => {
      for (const key of keys) {
        this.cliniqueKeys.push(key.Noclinique);
      }
      this.selectedClinique = this.cliniqueKeys[0];
    });

    this.communicationService.getProprietairePks().subscribe((keys: ProprietairePK[]) => {

      for (const key of keys) {
        this.proprietaire.push(key.Noproprietaire);
      }
      this.selectedOwner = this.proprietaire[0];
      console.log(this.proprietaire);
      this.getAllAnimal();
    });
  }

  private getAllAnimal(): void {

    this.communicationService.getAnimalsByKeys(this.selectedClinique, this.selectedOwner).subscribe((animals: Animal[]) => {
      this.animals = animals;
    });

  }

  public deleteAnimal(noanimal: string, Noclinique: string, Noproprietaire: string): void {
    this.communicationService.deleteAnimal(noanimal, Noclinique, Noproprietaire).subscribe((res: number) => {
      this.refresh();
    });

  }

  public updateSelectedClinique(id: any): void {

    this.selectedClinique = this.cliniqueKeys[id];
    this.refresh();
  }

  public updateSelectedOwner(id: any): void {
    this.selectedOwner = this.proprietaire[id];
    this.refresh();
  }

  private refresh(): void {
    this.Animal.nativeElement.innerText = "";
    this.nom.nativeElement.innerText = "";
    this.dateNaissance.nativeElement.innerText = "";
    this.DateInscription.nativeElement.innerText = "";
    this.taille.nativeElement.innerText = "";
    this.poids.nativeElement.innerText = "";
    this.description.nativeElement.innerText = "";
    this.espece.nativeElement.innerText = "";
    this.type.nativeElement.innerText = "";
    this.etat.nativeElement.innerText = "";
    this.getAllAnimal();
  }

  public insertAnimal() {
    const animal: Animal = {
      noproprietaire: this.selectedOwner,
      noclinique: this.selectedClinique,
      noanimal: this.Animal.nativeElement.innerText,
      nom: this.nom.nativeElement.innerText,
      datedenaissance: this.dateNaissance.nativeElement.innerText,
      dateinscription: this.DateInscription.nativeElement.innerText,
      taille: this.taille.nativeElement.innerText,
      poids: this.poids.nativeElement.innerText,
      description: this.description.nativeElement.innerText,
      espece: this.espece.nativeElement.innerText,
      type: this.type.nativeElement.innerText,
      etat: this.etat.nativeElement.innerText

    };

    this.communicationService.insertAnimal(animal).subscribe((res: number) => {
      console.log(animal);
      this.refresh();
    });

  }

  public updateAnimals(id: number): void {
    this.communicationService
    .updateAnimals(this.animals[id])
    .subscribe((res: any) => {
      this.refresh();
    });
  }

  public searchByName(): void {
    const name = this.nameToSearch.nativeElement.value;
    this.communicationService.getAnimalsByName(name).subscribe((animals: Animal[]) => {
      this.animals = animals;
    });
    console.log(name);
  }

  public changeName(event: any, i: number): void {
    const editField = event.target.textContent;
    this.animals[i].nom = editField;
  }
  public changeType(event: any, i: number): void {
    const editField = event.target.textContent;
    this.animals[i].type = editField;
  }
  public changeEspece(event: any, i: number): void {
    const editField = event.target.textContent;
    this.animals[i].espece = editField;
  }
  public changeDateNaissance(event: any, i: number): void {
    const editField = event.target.textContent;
    this.animals[i].datedenaissance = editField;
  }
  public changeDateInscription(event: any, i: number): void {
    const editField = event.target.textContent;
    this.animals[i].dateinscription = editField;
  }
  public changeDescription(event: any, i: number): void {
    const editField = event.target.textContent;
    this.animals[i].description = editField;
  }

  public changePoids(event: any, i: number): void {
    const editField = event.target.textContent;
    this.animals[i].poids = editField;
  }

  public changeTaille(event: any, i: number): void {
    const editField = event.target.textContent;
    this.animals[i].taille = editField;
  }

  public changeEtat(event: any, i: number): void {
    const editField = event.target.textContent;
    this.animals[i].etat = editField;
  }
}
