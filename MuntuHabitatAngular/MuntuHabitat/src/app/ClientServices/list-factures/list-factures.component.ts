import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import { FactureService } from '../../services/services/facture.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Facture } from '../../services/models/facture';

@Component({
  selector: 'app-list-factures',
  templateUrl: './list-factures.component.html',
  styleUrls: ['./list-factures.component.css']
})
export class ListFacturesComponent implements OnInit {
  selectedInvoice: Facture | null = null;
  factureList: Facture[] = [];
  closeResult = '';

  constructor(private factureService: FactureService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.factureService.getFactureList().subscribe((factures) => {
      this.factureList = factures;
    });
  }

  openFactureModal(content: any): void {
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

  downloadPdf(invoice: Facture | null, event: Event): void {
    event.stopPropagation();

    if (!invoice) {
      return; 
    }

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Facture: ${invoice.name}`, 10, 10);
    doc.setFontSize(14);
    doc.text(`ID: ${invoice.id}`, 10, 20);
    doc.text(`Montant: ${invoice.amount}€`, 10, 30);
    doc.text(`Date: ${invoice.date}`, 10, 40);
    doc.text(`Client: ${invoice.customer}`, 10, 50);

    doc.save(`facture_${invoice.id}.pdf`);
  }

}
