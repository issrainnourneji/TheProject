import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Facture } from '../../services/models/facture';
import { FactureService } from '../../services/services/facture.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-add-facture',
  templateUrl: './add-facture.component.html',
  styleUrl: './add-facture.component.css'
})
export class AddFactureComponent implements OnInit {
  factures: Facture[] = [];
  factureDetailsVisible: boolean[] = [];

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.factureService.getFactures().subscribe(factures => {
      this.factures = factures;
      this.factureDetailsVisible = new Array(factures.length).fill(false);
    });
  }

  toggleDetails(index: number) {
    this.factureDetailsVisible[index] = !this.factureDetailsVisible[index];
  }

  downloadFacture(numeroFacture: number) {
    this.factureService.getFactureByNumero(numeroFacture).subscribe(facture => {
      if (facture) {
        const doc = new jsPDF();
        const margin = 15;
        const pageWidth = doc.internal.pageSize.width;
        let yPosition = margin;

        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#193152');
        const title = 'Facture';
        const titleWidth = doc.getTextWidth(title);
        doc.text(title, (pageWidth - titleWidth) / 2, yPosition); // Centrer le titre
        yPosition += 22;


        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#4c8ec4');

        const dateEmissionText = `Date d'émission: ${facture.dateEmission.toLocaleDateString()}`;
        const dateEmissionWidth = doc.getTextWidth(dateEmissionText);
        doc.text(dateEmissionText, pageWidth - margin - dateEmissionWidth, yPosition);
        yPosition += -5;

        const dateEcheanceText = `Date d'échéance: ${facture.dateEcheance.toLocaleDateString()}`;
        const dateEcheanceWidth = doc.getTextWidth(dateEcheanceText);
        doc.text(dateEcheanceText, pageWidth - margin - dateEcheanceWidth, yPosition);
        yPosition += 2;

        const logoUrl = '../../../assets/MUNTU-Habitat-Logo-vertical.png';
        doc.addImage(logoUrl, 'PNG', margin, yPosition, 50, 20);
        yPosition += 37;

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#193152');
        doc.text('Informations sur le vendeur', margin, yPosition);
        doc.text('Informations sur le client', 115, yPosition); 
        yPosition += 12;

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#333333');
        doc.text(`Nom: ${facture.nomVendeur}`, margin, yPosition);
        doc.text(`Nom: ${facture.nomClient}`, 115, yPosition); // Ajuster la position du texte
        yPosition += 8;
        doc.text(`Adresse: ${facture.adresseVendeur}`, margin, yPosition);
        doc.text(`Adresse: ${facture.adresseClient}`, 115, yPosition); // Ajuster la position du texte
        yPosition += 8;
        doc.text(`Téléphone: ${facture.telephoneVendeur}`, margin, yPosition);
        doc.text(`Téléphone: ${facture.telephoneClient}`, 115, yPosition); // Ajuster la position du texte
        yPosition += 8;
        doc.text(`Email: ${facture.emailVendeur}`, margin, yPosition);
        doc.text(`Email: ${facture.emailClient}`, 115, yPosition); // Ajuster la position du texte
        yPosition += 17;

        // Lignes de facture
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#193152');
        doc.text('Détails de la facture', margin, yPosition);
        yPosition += 12;

        const lignes = facture.lignesFacture.map(ligne => [
          ligne.descriptionProduit,
          ligne.quantite.toString(),
          ligne.prixUnitaire.toFixed(2),
          ligne.montantTotal.toFixed(2)
        ]);
        const headers = ['Description', 'Quantité', 'Prix Unitaire', 'Montant Total'];

        (doc as any).autoTable({
          head: [headers],
          body: lignes,
          startY: yPosition,
          theme: 'striped',
          margin: { left: margin },
          styles: {
            fillColor: [255, 255, 255],
            textColor: [0, 0, 0],
            fontSize: 10
          },
          headStyles: {
            fillColor: [76, 142, 196],
            textColor: [255, 255, 255],
            fontSize: 12,
            fontStyle: 'bold'
          },
          alternateRowStyles: {
            fillColor: [239, 239, 239]
          }
        });

        // Mise à jour de la position après la table
        const finalY = (doc as any).autoTable.previous.finalY;
        yPosition = finalY + 15;

        // Totaux
        const totalX = pageWidth - 60; // Ajuster la position x pour les totaux
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor('#193152');
      doc.text('Totaux', totalX, yPosition);
      yPosition += 12;

      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor('#333333');
      doc.text(`Sous-total: ${facture.sousTotal.toFixed(2)}`, totalX, yPosition);
      yPosition += 8;
      doc.text(`Taxe: ${facture.taxe.toFixed(2)}`, totalX, yPosition);
      yPosition += 8;
      doc.text(`Total TTC: ${facture.totalTTC.toFixed(2)}`, totalX, yPosition);
      yPosition += 17;

        // Informations de paiement
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor('#193152');
        doc.text('Informations de paiement', margin, yPosition);
        yPosition += 12;

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor('#333333');
        doc.text(`Méthode de paiement: ${facture.methodePaiement}`, margin, yPosition);
        yPosition += 8;
        doc.text(`Coordonnées bancaires: ${facture.coordonneesBancaires}`, margin, yPosition);
        yPosition += 8;
        doc.text(`Conditions de paiement: ${facture.conditionsPaiement}`, margin, yPosition);
        yPosition += 8;
        doc.text(`Référence de paiement: ${facture.referencePaiement}`, margin, yPosition);

        // Pied de page
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor('#999999');
        const footerText = 'Merci pour votre confiance !';
        const footerWidth = doc.getTextWidth(footerText);
        doc.text(footerText, (pageWidth - footerWidth) / 2, yPosition + 20); // Centrer le pied de page

        // Sauvegarde du PDF
        doc.save(`facture_${facture.numeroFacture}.pdf`);
      }
    });
  }
}

