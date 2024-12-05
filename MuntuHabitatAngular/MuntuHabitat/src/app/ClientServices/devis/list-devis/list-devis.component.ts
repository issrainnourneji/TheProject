import { Component, TemplateRef } from '@angular/core';
import { Devis } from '../../../services/models/devis';
import { DevisService } from '../../../services/services/devis.service';

import $ from 'jquery';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';





@Component({
  selector: 'app-list-devis',
  templateUrl: './list-devis.component.html',
  styleUrl: './list-devis.component.css'
})
export class ListDevisComponent {


  selectedDevis: Devis | null = null;
     devisList: Devis[] = [
      {
        id: '001',
        numero: 'D001',
        description: 'Devis pour rénovation',
        dateCreation: new Date('2024-08-01'),
        montantTotal: 5000,
        etat: 'Validé',
        clientId: 2,
        validite: new Date('2024-12-31'),
        conditionsPaiement:'après une semaine',
        montantHT: 4200,
        montantTTC: 5000,
        tauxTVA: 20,
        dateSignature: new Date('2024-12-22'),
        signatureElectronique : true ,
        agentResponsable: 'Agent A'
      },
      {
        id: '002',
        numero: 'D002',
        description: 'Devis pour installation',
        dateCreation: new Date('2024-08-05'),
        montantTotal: 3000,
        etat: 'En attente',
        clientId: 156,
        validite: new Date('2024-11-30'),
        conditionsPaiement:'après une semaine',
        montantHT: 2500,
        montantTTC: 3000,
        tauxTVA: 20,
        dateSignature: new Date('2024-12-22'),
        signatureElectronique : true ,
        agentResponsable: 'Agent B'
      }
    ];
    closeResult = '';

    constructor(private devisService: DevisService, private modalService: NgbModal) {}

    ngOnInit(): void {
      this.devisService.getDevisList().subscribe((devis) => {
        this.devisList = devis;
      });
    }

    openDevisModal(content: any): void {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'Backdrop click';
      } else if (reason === ModalDismissReasons.ESC) {
        return 'Esc';
      } else {
        return `With: ${reason}`;
      }
    }
  }
