import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private readonly apiService: TokenService, private router: Router) { }
  formData: any = {
    email: '',
    name: '',
    phoneNumber: '',
    address:'',
    password: ''
  }

  message: any = null;


  async handleSubmit() {
    if (!this.formData.email || !this.formData.name || !this.formData.phoneNumber || !this.formData.password) {
      this.showMessage("All fields are required")
      return;
    }

    try {
      const response: any = await firstValueFrom(this.apiService.registerUser(this.formData));
      if (response.status === 200) {
        this.showMessage('User Successfully registered');
        this.router.navigate(['activate-account'])
      }
    } catch (error: any) {
        console.log(error)
        this.showMessage(error.error?.message || error.message || 'unable to register');
    }
  }



  showMessage(message: string) {
    this.message = message;
    setTimeout(() => {
      this.message == null
    }, 3000);
  }

}
