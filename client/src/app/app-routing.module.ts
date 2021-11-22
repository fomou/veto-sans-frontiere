import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { CliniqueComponent } from "./clinique/clinique.component";
import { PersonnelComponent } from "./personnel/personnel.component";
import { GuestComponent } from "./guest/guest.component";
import { PetComponent } from "./pet/pet.component";
import { PrescritpionComponent } from './prescritpion/prescritpion.component';
import { FactureComponent } from './facture/facture.component';

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "personnels", component: PersonnelComponent },
  { path: "cliniques", component: CliniqueComponent },
  { path: "guests", component: GuestComponent },
  { path: "pets", component: PetComponent },
  { path: "traitements", component: PrescritpionComponent },
  { path: "facture", component: FactureComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
