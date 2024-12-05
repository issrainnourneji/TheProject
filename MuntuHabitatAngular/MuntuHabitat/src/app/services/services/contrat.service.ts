import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private baseUrl ='http://localhost:8080/contrats';

  constructor(private http: HttpClient) { }
  uploadContract(file: File, userId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('userId', userId.toString());
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  getUserContracts(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/${userId}`);
  }
  getContractPdfUrl(contractId: number): string {
    return `${this.baseUrl}/pdf/${contractId}`;
  }
}
