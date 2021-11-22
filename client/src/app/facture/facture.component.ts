import { Component, OnInit } from "@angular/core";
import { Animal } from "../../../../common/tables/Animal";
import { AnimalPk } from "../../../../common/tables/AnimalPks";
import { Examen } from "../../../../common/tables/Examen";
// import { Facture } from "../../../../common/tables/Facture";
import { CliniquePks } from "../../../../common/tables/HotelPK";
import { Prescription } from "../../../../common/tables/Prescription";
import { Proprietaire } from "../../../../common/tables/Proprietaire";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-facture",
  templateUrl: "./facture.component.html",
  styleUrls: ["./facture.component.css"]
})
export class FactureComponent implements OnInit {

  public animalPks: AnimalPk[] = [];
  public cliniquePks: CliniquePks[];
  public facture: any = {};
  public selectedAnimal: string;
  public selectedClinique: string;
  public traitements: Prescription[] = [];
  public proprietaire: Proprietaire[] = [];
  public animal: Animal = { } as Animal;
  public prescriptionInstantiated: boolean = false;
  anim:boolean =false
  public examen: Examen;
  public total: number = 0;
  public constructor(private communicationService: CommunicationService) { }

  public ngOnInit(): void {

    this.communicationService.getAnimalsPks().subscribe((keys: AnimalPk[]) => {
      this.animalPks = keys;
      this.selectedAnimal = this.animalPks[0].NoAnimal;
      this.getPrescription();

    });

    this.communicationService.getcliniquePKs().subscribe((keys: CliniquePks[]) => {
      this.cliniquePks = keys;
      this.selectedClinique = this.cliniquePks[0].Noclinique;
      this.refresh();
      this.facture = this.genererLaFacture();
    });

  }

  public getPrescription(): void {
    this.communicationService.getTraitement(this.selectedAnimal).subscribe((resultat: Prescription[]) => {
      this.traitements = resultat;
      this.total = this.computeTotal();
      this.prescriptionInstantiated = true;
    });
    this.getAnimal();

  }

  public getProprietaire(): void {
      this.communicationService.getProprietaire(this.selectedAnimal, this.selectedClinique).subscribe((res: Proprietaire[]) => {
   this.proprietaire = res;
});

  }

  private computeTotal(): number {
    let sum: number = 0;
    for (const traitent of this.traitements) {
      sum += traitent.quantiteTraitement;
    }
    return sum + 20;
  }

  private getAnimal(): void {
    this.communicationService.getTables("animal").subscribe((animal: any[]) => {

      for (const anim of animal) {
        if (anim.noanimal === this.selectedAnimal && anim.noclinique === this.selectedClinique) {
          this.animal = anim;
        }
      }

      this.anim = true;

    });

    this.communicationService.getTables("examen").subscribe((animal: any[]) => {

      for (const anim of animal) {
        if (anim.noanimal === this.selectedAnimal && anim.noclinique === this.selectedClinique) {
          this.examen = anim;
        }
      }
    });

  }

  public refresh(): void {
    this.getAnimal();
    this.getPrescription();
    this.getProprietaire();
   this.facture= this.genererLaFacture();
  }

  public genererLaFacture(): any {

    const utc = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
    return {
      noFacture: "F" + this.selectedAnimal + this.selectedClinique,
      total: this.total,
      date: utc,
      moyenDePayement: "carte de debit",
      etat: "paye"
    };
  }

  public updateSelectedAnimal(id: any): void {
    this.selectedAnimal = this.animalPks[id].NoAnimal;
    this.refresh();
  }

  public updateSelectedClinique(id: any): void {
    this.selectedClinique = this.cliniquePks[id].Noclinique;
    this.refresh();
    this.genererLaFacture()
  }

}
