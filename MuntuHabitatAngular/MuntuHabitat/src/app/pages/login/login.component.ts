import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private readonly apiService: TokenService, private router: Router) { }

  formData: any = {
    email: '',
    password: ''
  }

  message: any = null;

  async handleSubmit() {
    if (!this.formData.email ||  !this.formData.password) {
      this.showMessage("Email and Password are required");
      return;
    }

    try {
      const response: any = await firstValueFrom(this.apiService.loginUser(this.formData));
      if (response.status === 200) {
        this.showMessage('User Successfully logged in');

        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);

        this.apiService.authStatuschanged.emit();

        if (response.role === 'USER') {
          this.router.navigate(['/main']);
        } else if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        }else if (response.role === 'AGENT') {
          this.router.navigate(['/agentHome']);
        }
      }
    } catch (error: any) {
      console.log(error);
      if (error.message.includes('Account not activated')) {
        this.showMessage('Please activate your account by checking your email.');
    } else {
        this.showMessage(error.error?.message || error.message || 'Unable to login');
    }    }
  }

  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
