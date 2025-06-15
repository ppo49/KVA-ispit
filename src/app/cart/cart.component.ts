import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../services/main.service';
import { MovieModel } from '../models/movie.model';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { Router } from '@angular/router';  
import { CartModel } from '../models/cart.model';
import { AuthService } from '../services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { MatTable } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-cart',
  imports: [
    NgIf,
    /*NgFor,*/
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTable,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartModel[] = [];
  totalPrice: number = 0;
  displayedColumns: string[] = ['film', 'status', 'gledano', 'ocena', 'akcija'];
  reserved: boolean = false;

  dataSource = new MatTableDataSource<CartModel>();


  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
    this.dataSource.data = this.cartItems;
    this.izracunajTotalPrice();
  }

  izracunajTotalPrice() {
    this.totalPrice = this.cartItems.reduce((sum, item) => {
      if (item.ticketPrice && !isNaN(item.ticketPrice)) {
        return sum + (item.ticketPrice * item.numberOfTickets);
      } else {
        console.error("Nevažeća cena za film:", item.movieTitle);
        return sum;
      }
    }, 0);
  }

  clearCart() {
    localStorage.removeItem('cartItems');
    this.cartItems = [];
  }

  reserveCart() {
    const user = this.authService.getLoggedInUser();
    
    if (!user) {
      this.snackBar.open('Morate biti ulogovani da biste rezervisali karte.', 'U redu', { duration: 3000 });
      this.router.navigate(['/login']);
      return;
    }
  

    this.cartItems = this.cartItems.map(item => ({
      ...item,
      status: 'rezervisano'
    }));
  
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  
    this.reserved = true; 
  
    const email = user.email;
    alert(`Karte su rezervisane. Potvrda je poslata na ${email}. Ukupna cena: ${this.totalPrice} RSD`);
  }
  

  removeiFilm(index: number): void {
    this.cartItems.splice(index, 1); 
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.dataSource.data = [...this.cartItems]; 
  this.izracunajTotalPrice();
  }

 
  

  markAsWatched(item: CartModel) {
    if (item.status !== 'gledano') {
      item.status = 'gledano';
      this.saveCartToLocalStorage();
    }
  }
  
  saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
  
  
  
}
