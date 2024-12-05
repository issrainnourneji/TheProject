import { LigneFacture } from "./ligneFacture";

export interface Facture {
  id: string;
  name: string;
  amount: number;
  date: string;
  customer: string;
  numeroFacture: number;
  dateEmission: Date;
  dateEcheance: Date;

  nomVendeur: string;
  adresseVendeur: string;
  telephoneVendeur: string;
  emailVendeur: string;
  numeroIdentificationFiscale: string;

  nomClient: string;
  adresseClient: string;
  telephoneClient: string;
  emailClient: string;

  lignesFacture: LigneFacture[];

  sousTotal: number;
  taxe: number;
  totalTTC: number;

  methodePaiement: string;
  coordonneesBancaires: string;
  conditionsPaiement: string;
  referencePaiement: string;
}
