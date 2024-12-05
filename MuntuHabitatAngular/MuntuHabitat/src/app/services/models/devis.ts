export interface Devis {
  id: string;
  numero: string;
  description: string;
  dateCreation: Date;
  montantTotal: number;
  etat: 'En attente' | 'Validé' | 'Rejeté';
  clientId: number;
  validite: Date;
  conditionsPaiement: string;
  montantHT: number;
  montantTTC: number;
  tauxTVA: number;
  dateSignature: Date | null;
  signatureElectronique: boolean;
  agentResponsable: string;      
}
