import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent   implements OnInit {
  constructor(private apiService: TokenService, private router: Router) { }
  userInfo: any = null;
  error: any = null;

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  fetchUserInfo(): void {
    this.apiService.getLoggedInUserInfo().subscribe({
      next: (response) => {
        this.userInfo = response.user
      },
      error: (error) => {
        console.log(error)
        this.error = error?.error?.message || "Unable to fetch user information"
      }
    })
  }

}
