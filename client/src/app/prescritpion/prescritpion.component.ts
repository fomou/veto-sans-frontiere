import { Component, OnInit } from '@angular/core';
//import { Animal } from '../../../../common/tables/Animal';
import { Prescription } from '../../../../common/tables/Prescription';
import { CommunicationService } from '../communication.service';
import { AnimalPk } from '../../../../common/tables/AnimalPks';
//import { Traitement } from '../../../../common/tables/Traitement';

@Component({
  selector: 'app-prescritpion',
  templateUrl: './prescritpion.component.html',
  styleUrls: ['./prescritpion.component.css']
})
export class PrescritpionComponent implements OnInit {

  traitements: Prescription[] = []
  animalPks: string[] = []
  selectedAnimal:string=""

  constructor(private communicationService:CommunicationService) { }

  ngOnInit(): void {

    this.communicationService.getAnimalsPks().subscribe((keys: AnimalPk[]) => {
      for (const key of keys) {
        this.animalPks.push(key.NoAnimal)
      }

      this.selectedAnimal = this.animalPks[0];
      this.getTraitements()
    })


  }

  public getTraitements() {
    this.communicationService.getTraitement(this.selectedAnimal).subscribe((traitement: Prescription[]) => {
      this.traitements=traitement
    })
  }

  public updateSelectedAnimal(id: any) {
    this.selectedAnimal = this.animalPks[id]
    this.refresh()
  }

  private refresh(): void{
    this.getTraitements()
  }

}
