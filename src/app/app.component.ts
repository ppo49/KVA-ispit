import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
/*import { MatSlideToggleModule } from '@angular/material/slide-toggle';*/
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatSnackBarModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'kva-projekat-v2-2025';

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}


