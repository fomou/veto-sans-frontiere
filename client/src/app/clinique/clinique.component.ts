import { Component, ElementRef, ViewChild } from "@angular/core";
import { Clinique } from "../../../../common/tables/Clinique";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-Clinique",
  templateUrl: "./clinique.component.html",
  styleUrls: ["./clinique.component.css"],
})
export class CliniqueComponent {
  @ViewChild("Noclinique") newNoclinique: ElementRef;
  @ViewChild("adresse") newAdresse: ElementRef;
  @ViewChild("Numtelephone") newNumtelephone: ElementRef;
  @ViewChild("Numtelecopie") newNumtelecopie: ElementRef;

  public cliniques: Clinique[] = [];
  public duplicateError: boolean = false;

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.getCliniques();
  }

  public getCliniques(): void {
    this.communicationService.getCliniques().subscribe((cliniques: Clinique[]) => {
      this.cliniques = cliniques;
    });

  }

  public insertClinique(): void {
    const clinique: Clinique = {
      Noclinique: this.newNoclinique.nativeElement.innerText,
      adresse: this.newAdresse.nativeElement.innerText,
      NumTelephone: this.newNumtelephone.nativeElement.innerText,
      NumTelecopie: this.newNumtelecopie.nativeElement.innerText,
    };

    this.communicationService.insertClinique(clinique).subscribe((res: number) => {
      if (res > 0) {
        this.communicationService.filter("update");
      }
      this.refresh();
      console.log("here inserting")
      this.duplicateError = res === -1;
    });
  }

  private refresh() {
    this.getCliniques();
    console.log(this.cliniques)
    this.newNoclinique.nativeElement.innerText = "";
    this.newAdresse.nativeElement.innerText = "";
    this.newNumtelephone.nativeElement.innerText = "";
    this.newNumtelecopie.nativeElement.innerText = "";
  }

  public deleteClinique(CliniqueNb: string) {
    this.communicationService.deleteClinique(CliniqueNb).subscribe((res: any) => {
      this.refresh();
    });
  }

  public changeCliniqueName(event: any, i:number){
    const editField = event.target.textContent;
    this.cliniques[i].adresse = editField;
  }

  public changeCliniqueCity(event: any, i:number){
    const editField = event.target.textContent;
    this.cliniques[i].NumTelephone = editField;
  }

  public changeNumTelecope(event: any, i: number): void{
    const editField = event.target.textContent;
    this.cliniques[i].NumTelecopie = editField;
  }

  public updateClinique(i: number) {
    this.communicationService.updateClinique(this.cliniques[i]).subscribe((res: any) => {
      this.refresh();
    });
  }
}
