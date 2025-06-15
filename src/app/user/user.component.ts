import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule
  ]
})
export class UserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    const user = this.authService.getCurrentUser();
    this.userForm = this.fb.group({
      firstName: [user?.firstName || ''],
      lastName: [user?.lastName || ''],
      email: [{ value: user?.email || '', disabled: true }],
      phone: [user?.phone || ''],
      address: [user?.address || ''],
      favoriteMovies: [user?.favoriteMovies || ''],
      Reviews:[user?.Reviews || '']
    });
  }

  save() {
    const updatedUser = { ...this.authService.getCurrentUser(), ...this.userForm.getRawValue() };
    this.authService.updateCurrentUser(updatedUser);
    alert('Podaci su sačuvani.');
  }
}