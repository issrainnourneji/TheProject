import { Component, OnInit } from '@angular/core';
import { PrestationPrix } from '../../../services/models/prestationPrix';
import { PrestationPrixService } from '../../../services/services/prestationPrix.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-prestation-list',
  templateUrl: './prestation-list.component.html',
  styleUrl: './prestation-list.component.css'
})
export class PrestationListComponent implements OnInit {
  list:PrestationPrix[]=[]
  p: number = 1;
  constructor(private prixService : PrestationPrixService, private router : Router) { }

  ngOnInit(): void {
    this.getListPrix();
   // alert(this.list);
   console.log(this.list)
  }
  getListPrix(){
    this.prixService.getData().subscribe(
      data=>{this.list=data;
      console.log(this.list);

    }
    )

  }
  DeletePrestation(id:any){
    this.prixService.deletePrestation(Number(id)).subscribe( () =>this.getListPrix() );
  }

  ajouterPrestation(){
    this.router.navigate(['agentHome/addprestation']);
  }
  onEditPrestation(id: any) {
    this.router.navigate([`/agentHome/Listprix/update`, id]);
  }

}
