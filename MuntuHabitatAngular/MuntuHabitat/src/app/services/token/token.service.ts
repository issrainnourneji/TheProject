import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prospect } from '../models/prospect';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  authStatuschanged = new EventEmitter<void>();
  private static BASE_URL = 'http://localhost:8080';


  constructor(private http: HttpClient) { }


  private getHeader():HttpHeaders{
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  registerUser(registration: any): Observable<any>{
    return this.http.post(`${TokenService.BASE_URL}/auth/register`, registration);
  }

  registerAgent(registration: any): Observable<any>{
    return this.http.post(`${TokenService.BASE_URL}/auth/registerAgent`, registration);
  }
  registerProspect(registration: any): Observable<any>{
    return this.http.post(`${TokenService.BASE_URL}/auth/registerProspect`, registration);
  }

  loginUser(loginDetails: any): Observable<any>{
    return this.http.post(`${TokenService.BASE_URL}/auth/login`, loginDetails);
  }

  getLoggedInUserInfo(): Observable<any> {
    return this.http.get(`${TokenService.BASE_URL}/user/my-info`, {
      headers: this.getHeader()
    })
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${TokenService.BASE_URL}/user/get-all`, {
      headers: this.getHeader()
    });
  }

  getProspects(): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`${TokenService.BASE_URL}/simulation/prospects`);
  }

  getUserById(id: number): Observable<Prospect[]> {
    return this.http.get<Prospect[]>(`${TokenService.BASE_URL}/simulation/prospect/${id}`);
  }


    logout():void{
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }

    isAuthenticated():boolean{
      const token = localStorage.getItem('token')
      return !!token;
    }

    isAdmin():boolean {
      const role = localStorage.getItem('role')
      return role === 'ADMIN';
    }
    isClient():boolean {
      const role = localStorage.getItem('role')
      return role === 'USER';
    }
    isAgent():boolean {
      const role = localStorage.getItem('role')
      return role === 'AGENT';
    }
}
