import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { GuestComponent } from "./guest/guest.component";
import { CliniqueComponent } from "./clinique/clinique.component";
import { PersonnelComponent } from "./personnel/personnel.component";
import { PetComponent } from './pet/pet.component';
import { PrescritpionComponent } from './prescritpion/prescritpion.component';
import { FactureComponent } from './facture/facture.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonnelComponent,
    CliniqueComponent,
    GuestComponent,
    PetComponent,
    PrescritpionComponent,
    FactureComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
