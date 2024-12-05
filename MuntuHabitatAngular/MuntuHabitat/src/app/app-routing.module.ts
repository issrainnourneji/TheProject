import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account/activate-account.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AdminHomeComponent } from './dashbords/admin-home/admin-home.component';
import { AgentHomeComponent } from './dashbords/agent-home/agent-home.component';
import { ContratComponent } from './ClientServices/sidebar/contrat/contrat.component';
import { SimulationComponent } from './Simulation/simulation/simulation.component';
import { AddSimulationComponent } from './Simulation/add-simulation/add-simulation.component';
import { ListUsersComponent } from './dashbords/gestionUsers/list-users/list-users.component';
import { AddAgentComponent } from './dashbords/gestionUsers/add-agent/add-agent.component';
import { DetailsSimulationComponent } from './Simulation/details-simulation/details-simulation.component';
import { AddCategorieComponent } from './Categorie/add-categorie/add-categorie.component';
import { AddFactureComponent } from './AgentManagement/add-facture/add-facture.component';
import { ListFacturesComponent } from './ClientServices/list-factures/list-factures.component';
import { ListDevisComponent } from './ClientServices/devis/list-devis/list-devis.component';
import { DetailsDevisComponent } from './AgentManagement/details-devis/details-devis.component';
import { DocumentComponent } from './ClientServices/sidebar/document/document.component';
import { ServicesComponent } from './ClientServices/sidebar/services/services.component';
import { AddContratComponent } from './AgentManagement/add-contrat/add-contrat.component';
import { ListContratComponent } from './AgentManagement/list-contrat/list-contrat.component';
import { ProspectListComponent } from './dashbords/gestionUsers/prospect-list/prospect-list.component';
import { AddPrestationComponent } from './ClientServices/BasePrix/add-prestation/add-prestation.component';
import { PrestationListComponent } from './ClientServices/BasePrix/prestation-list/prestation-list.component';
import { UpdatePrestationComponent } from './ClientServices/BasePrix/update-prestation/update-prestation.component';
import { adminGuard, agentGuard, clientGuard, userGuard } from './services/guard/auth.guard';
import { ProspectDetailsComponent } from './dashbords/gestionUsers/prospect-details/prospect-details.component';
import { AddPostComponent } from './AgentManagement/add-post/add-post.component';
import { ListPostComponent } from './ClientServices/list-post/list-post.component';
import { AllPostsComponent } from './AgentManagement/all-posts/all-posts.component';
import { AddAppointmentComponent } from './ClientServices/add-appointment/add-appointment.component';
import { ListAppointmentComponent } from './AgentManagement/list-appointment/list-appointment.component';

const routes: Routes = [


  {path:"",redirectTo:"home", pathMatch:"full"},
  {path: "notfound" , component:NotFoundComponent},
  {path: "login" , component:LoginComponent
},
  {path: "register" , component:RegisterComponent},
  {path: "activate-account" , component:ActivateAccountComponent},
  {path: "home" , component:HomeComponent, children: [
    // {
    //   path: 'simulation',
    //   component: SimulationComponent
    // }
  ]
  },
  { path: 'detail/:id', component: AddCategorieComponent }
,
{ path: 'listp/:id', component: ProspectDetailsComponent },

  {
    path: 'simulation',
    component: SimulationComponent
  },
  {
    path: 'realisation',
    component: DetailsSimulationComponent
  },
  {path: "main" , component:MainComponent, children: [
    {path: 'profile', component: ProfilComponent,canActivate: [userGuard]},
    {
      path: 'document',component: DocumentComponent,canActivate: [clientGuard],children: [
        {
          path: 'listfact',
          component: ListFacturesComponent,
          canActivate: [clientGuard]
        },
        {
          path: 'listDevis',
          component: ListDevisComponent,
          canActivate: [clientGuard]
        },
        {
          path: 'listFacture',
          component: AddFactureComponent,
          canActivate: [clientGuard]
        }
      ]
    },
    {
      path: 'contrat',
      component: ContratComponent,
      canActivate: [clientGuard]
    },
    {
      path: 'services',
      component: ServicesComponent,
      canActivate: [clientGuard], children:[
        {
          path: 'posts',
          component: ListPostComponent,
          canActivate: [clientGuard]
        },
        {
          path: 'rendezvous',
          component: AddAppointmentComponent,
          canActivate: [clientGuard]
        }
      ]
    },

  ]
    ,canActivate : [clientGuard]},
  {path: "admin" , component:AdminHomeComponent, children: [
    {path: 'profile', component: ProfilComponent,canActivate: [userGuard]},

    {
      path: 'addSimulation',
      component: AddSimulationComponent,canActivate:[adminGuard]
    },
    {
      path: 'UserList',
      component: ListUsersComponent,canActivate:[adminGuard]
    },
    {
      path: 'addagent',
      component: AddAgentComponent,canActivate:[adminGuard]
    },
     {
      path: 'prospect',
      component: ProspectListComponent,canActivate:[adminGuard]
    },
  ],canActivate:[adminGuard]
  },
  {path: "agentHome" , component:AgentHomeComponent, children: [
    {path: 'profile', component: ProfilComponent,canActivate: [userGuard]},
    {
      path: 'addfacture',
      component: AddFactureComponent,canActivate:[agentGuard]
    },
    {
      path: 'listfact',
      component: ListFacturesComponent,canActivate:[agentGuard]
    },
    {
      path: 'listDevisagent',
      component: DetailsDevisComponent,canActivate:[agentGuard]
    },
    {
      path: 'listDevis',
      component: ListDevisComponent,canActivate:[agentGuard]
    },
    { path: 'Listprix/update/:id', component: UpdatePrestationComponent,canActivate:[agentGuard] },
    { path: 'contract/view/:contractId', component: AddContratComponent,canActivate:[agentGuard] },
    { path: 'addprestation', component: AddPrestationComponent ,canActivate:[agentGuard]},
    { path: 'Listprix', component: PrestationListComponent,canActivate:[agentGuard]},
    {
      path: 'ListContrat',
      component: ListContratComponent,canActivate:[agentGuard]
    },
    {
      path: 'addpost',
      component: AddPostComponent,canActivate:[agentGuard]
    },
    {
      path: 'postlist',
      component: AllPostsComponent,canActivate:[agentGuard]
    },
    {
      path: 'rendezvlist',
      component: ListAppointmentComponent,canActivate:[agentGuard]
    },

  ],canActivate:[agentGuard]
  },
  { path: 'devis/:id', component: DetailsDevisComponent },
  {path: '**', component: NotFoundComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
