import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Devis } from '../models/devis';

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  private devisList: Devis[] = [
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

  constructor() {}

  getDevisList(): Observable<Devis[]> {
    return of(this.devisList);
  }

  getDevisById(id: string): Observable<Devis | undefined> {
    return of(this.devisList.find(devis => devis.id === id));
  }
  updateDevis(updatedDevis: Devis): Observable<Devis> {
    const index = this.devisList.findIndex(devis => devis.id === updatedDevis.id);
    if (index !== -1) {
      this.devisList[index] = updatedDevis;
      return of(updatedDevis);
    } else {
      throw new Error('Devis non trouvé');
    }
  }

}
