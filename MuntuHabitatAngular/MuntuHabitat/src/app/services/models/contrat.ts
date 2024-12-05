export interface Contrat {
  id: number;
  name: string;
  pdfUrl: string;
  isSigned: boolean;
  client: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
  };
}
