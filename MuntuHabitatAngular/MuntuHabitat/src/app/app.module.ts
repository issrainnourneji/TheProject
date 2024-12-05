import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account/activate-account.component';
import { CodeInputModule } from 'angular-code-input';
import { HomeComponent } from './pages/home/home.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AdminHomeComponent } from './dashbords/admin-home/admin-home.component';
import { AgentHomeComponent } from './dashbords/agent-home/agent-home.component';
import { ContratComponent } from './ClientServices/sidebar/contrat/contrat.component';
import { SimulationComponent } from './Simulation/simulation/simulation.component';
import { AddSimulationComponent } from './Simulation/add-simulation/add-simulation.component';
import { HeaderHomeComponent } from './Components/header-home/header-home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderClientComponent } from './Components/header-client/header-client.component';
import { ListUsersComponent } from './dashbords/gestionUsers/list-users/list-users.component';
import { UserControllerService } from './services/services';
import { AddAgentComponent } from './dashbords/gestionUsers/add-agent/add-agent.component';
import { DetailsSimulationComponent } from './Simulation/details-simulation/details-simulation.component';
import { AddCategorieComponent } from './Categorie/add-categorie/add-categorie.component';
import { AddFactureComponent } from './AgentManagement/add-facture/add-facture.component';
import { ListFacturesComponent } from './ClientServices/list-factures/list-factures.component';
import { ListDevisComponent } from './ClientServices/devis/list-devis/list-devis.component';
import { DetailsDevisComponent } from './AgentManagement/details-devis/details-devis.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DocumentComponent } from './ClientServices/sidebar/document/document.component';
import { ServicesComponent } from './ClientServices/sidebar/services/services.component';
import { AddContratComponent } from './AgentManagement/add-contrat/add-contrat.component';
import { ListContratComponent } from './AgentManagement/list-contrat/list-contrat.component';
import { ProspectListComponent } from './dashbords/gestionUsers/prospect-list/prospect-list.component';
import { PrestationPrixComponent } from './Simulation/prestation-prix/prestation-prix.component';
import { AddPrestationComponent } from './ClientServices/BasePrix/add-prestation/add-prestation.component';
import { PrestationListComponent } from './ClientServices/BasePrix/prestation-list/prestation-list.component';
import { UpdatePrestationComponent } from './ClientServices/BasePrix/update-prestation/update-prestation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProspectDetailsComponent } from './dashbords/gestionUsers/prospect-details/prospect-details.component';
import { AddPostComponent } from './AgentManagement/add-post/add-post.component';
import { ListPostComponent } from './ClientServices/list-post/list-post.component';
import { AllPostsComponent } from './AgentManagement/all-posts/all-posts.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AddAppointmentComponent } from './ClientServices/add-appointment/add-appointment.component';
import { ListAppointmentComponent } from './AgentManagement/list-appointment/list-appointment.component';

export function kcFactory(){
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    HomeComponent,
    ProfilComponent,
    MainComponent,
    NotFoundComponent,
    AdminHomeComponent,
    AgentHomeComponent,
    ContratComponent,
    SimulationComponent,
    AddSimulationComponent,
    FooterComponent,
    ListUsersComponent,
    AddAgentComponent,
    DetailsSimulationComponent,
    AddCategorieComponent,
    AddFactureComponent,
    ListFacturesComponent,
    ListDevisComponent,
    DetailsDevisComponent,
    DocumentComponent,
    ServicesComponent,
    AddContratComponent,
    ListContratComponent,
    ProspectListComponent,
    PrestationPrixComponent,
    AddPrestationComponent,
    PrestationListComponent,
    UpdatePrestationComponent,
    HeaderHomeComponent,
    HeaderClientComponent,
    ProspectDetailsComponent,
    AddPostComponent,
    ListPostComponent,
    AllPostsComponent,
    AddAppointmentComponent,
    ListAppointmentComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CodeInputModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    NgxPaginationModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:() => localStorage.getItem('token')
      }
    })
  ],
  providers: [
    UserControllerService,
    HttpClient,
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
