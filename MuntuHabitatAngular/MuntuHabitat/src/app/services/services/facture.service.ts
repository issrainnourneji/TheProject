import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Facture } from '../models/facture';
import { LigneFacture } from '../models/ligneFacture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private factureList: Facture[] = [
    { id: '001', name: 'Facture A', amount: 100, date: '2024-08-01', customer: 'Client A', numeroFacture: 1001,
      dateEmission: new Date('2024-09-15'),
      dateEcheance: new Date('2024-10-15'),
      nomVendeur: 'Tech Solutions',
      adresseVendeur: '123 Rue des Startups, Paris, France',
      telephoneVendeur: '+33 1 23 45 67 89',
      emailVendeur: 'contact@techsolutions.com',
      numeroIdentificationFiscale: 'FR123456789',
      nomClient: 'Entreprise XYZ',
      adresseClient: '456 Avenue du Business, Lyon, France',
      telephoneClient: '+33 4 12 34 56 78',
      emailClient: 'info@xyz.com',
      lignesFacture: [
        new LigneFacture({ descriptionProduit: 'Produit 1', quantite: 50, prixUnitaire: 60 }),
        new LigneFacture({ descriptionProduit: 'Produit 2', quantite: 1, prixUnitaire: 100 })
      ],
      sousTotal: 3100,
      taxe: 620,
      totalTTC: 3720,
      methodePaiement: 'Virement bancaire',
      coordonneesBancaires: 'FR76 1234 5678 9101 1121',
      conditionsPaiement: 'Paiement à 30 jours',
      referencePaiement: 'REF1001' },
    { id: '002', name: 'Facture B', amount: 200, date: '2024-08-05', customer: 'Client B',numeroFacture: 1002,
      dateEmission: new Date('2024-09-10'),
      dateEcheance: new Date('2024-09-30'),
      nomVendeur: 'Solutions Marketing',
      adresseVendeur: '12 Boulevard des Ventes, Nice, France',
      telephoneVendeur: '+33 9 87 65 43 21',
      emailVendeur: 'sales@solutionsmarketing.com',
      numeroIdentificationFiscale: 'FR987654321',
      nomClient: 'Startup Alpha',
      adresseClient: '78 Rue des Entrepreneurs, Marseille, France',
      telephoneClient: '+33 4 56 78 90 12',
      emailClient: 'contact@startupalpha.com',
      lignesFacture: [
        new LigneFacture({ descriptionProduit: 'Produit 1', quantite: 30, prixUnitaire: 80 }),
        new LigneFacture({ descriptionProduit: 'Produit 2', quantite: 1, prixUnitaire: 500 })
      ],
      sousTotal: 2900,
      taxe: 580,
      totalTTC: 3480,
      methodePaiement: 'Carte de crédit',
      coordonneesBancaires: 'XXXX-XXXX-XXXX-5678',
      conditionsPaiement: 'Paiement à réception',
      referencePaiement: 'REF1002' },
    { id: '003', name: 'Facture C', amount: 100, date: '2024-08-01', customer: 'Client A',numeroFacture: 1003,
      dateEmission: new Date('2024-09-20'),
      dateEcheance: new Date('2024-10-20'),
      nomVendeur: 'Consulting IT',
      adresseVendeur: '45 Avenue du Code, Toulouse, France',
      telephoneVendeur: '+33 5 61 23 45 67',
      emailVendeur: 'info@consultingit.com',
      numeroIdentificationFiscale: 'FR456789123',
      nomClient: 'Société Bêta',
      adresseClient: '23 Rue de l\'Innovation, Bordeaux, France',
      telephoneClient: '+33 5 67 89 01 23',
      emailClient: 'contact@societebeta.com',
      lignesFacture: [
        new LigneFacture({ descriptionProduit: 'Produit 1', quantite: 1, prixUnitaire: 1500 }),
        new LigneFacture({ descriptionProduit: 'Produit 2', quantite: 5, prixUnitaire: 200 })
      ],
      sousTotal: 2500,
      taxe: 500,
      totalTTC: 3000,
      methodePaiement: 'Virement bancaire',
      coordonneesBancaires: 'FR76 2345 6789 0123 4567',
      conditionsPaiement: 'Paiement à 30 jours',
      referencePaiement: 'REF1003' },
    { id: '004', name: 'Facture D', amount: 200, date: '2024-08-05', customer: 'Client B',numeroFacture: 1003,
      dateEmission: new Date('2024-09-20'),
      dateEcheance: new Date('2024-10-20'),
      nomVendeur: 'Consulting IT',
      adresseVendeur: '45 Avenue du Code, Toulouse, France',
      telephoneVendeur: '+33 5 61 23 45 67',
      emailVendeur: 'info@consultingit.com',
      numeroIdentificationFiscale: 'FR456789123',
      nomClient: 'Société Bêta',
      adresseClient: '23 Rue de l\'Innovation, Bordeaux, France',
      telephoneClient: '+33 5 67 89 01 23',
      emailClient: 'contact@societebeta.com',
      lignesFacture: [
        new LigneFacture({ descriptionProduit: 'Produit 1', quantite: 1, prixUnitaire: 1500 }),
        new LigneFacture({ descriptionProduit: 'Produit 2', quantite: 5, prixUnitaire: 200 })
      ],
      sousTotal: 2500,
      taxe: 500,
      totalTTC: 3000,
      methodePaiement: 'Virement bancaire',
      coordonneesBancaires: 'FR76 2345 6789 0123 4567',
      conditionsPaiement: 'Paiement à 30 jours',
      referencePaiement: 'REF1003' }
  ];
  constructor() {}
 getFactures(): Observable<Facture[]> {
  return of(this.factureList);
}

ajouterFacture(facture: Facture): Observable<void> {
  this.factureList.push(facture);
  return of();
}

getFactureByNumero(numeroFacture: number): Observable<Facture | undefined> {
  const facture = this.factureList.find(f => f.numeroFacture === numeroFacture);
  return of(facture);
}

  getFactureList(): Observable<Facture[]> {
    return of(this.factureList);
  }

  getFactureById(id: string): Observable<Facture | undefined> {
    return of(this.factureList.find(facture => facture.id === id));
  }
  updateFacture(updatedFacture: Facture): Observable<Facture> {
    const index = this.factureList.findIndex(facture => facture.id === updatedFacture.id);
    if (index !== -1) {
      this.factureList[index] = updatedFacture;
      return of(updatedFacture);
    } else {
      throw new Error('Facture non trouvé');
    }
  }

}
