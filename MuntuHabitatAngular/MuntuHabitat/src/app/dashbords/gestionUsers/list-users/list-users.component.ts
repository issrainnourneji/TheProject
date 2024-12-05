import { Component } from '@angular/core';
import { UserControllerService } from '../../../services/services';
import { RegistrationRequest, Role, User } from '../../../services/models';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  users: any[] = [];
  error:any = null;

  constructor(private userService:TokenService ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.users = response.userList || [];
      },
      error: (err) =>{
        this.error = err?.error?.message || 'unable to get users'
      }
    });
  }
}
