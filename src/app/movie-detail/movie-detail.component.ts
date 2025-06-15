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

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
  imports: [
    NgIf,
    NgFor,
    DatePipe,
    MatCardModule,
    MatDividerModule,
    MatProgressBarModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class MovieDetailComponent implements OnInit {
  movie: MovieModel | null = null;
  public error: string | null = null;
  numberValue: number = 0;
  ticketPrice: number = 0;

  cartItem: CartModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router 
  ) {}
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMovie(+id);
    }
  }

  async loadMovie(id: number) {
    try {
      const response = await new MovieService().getMovieById(id);
      this.movie = response;
      this.ticketPrice = this.movie?.runTime ? Math.ceil(this.movie.runTime * 5) : 90 * 5; // 5 RSD po minuti
    } catch (error) {
      console.error('Greška pri učitavanju filma:', error);
    }
  }

  submitNumber() {
    if (isNaN(this.numberValue) || this.numberValue <= 0) {
      this.snackBar.open('Molimo unesite validan broj karata.', 'Zatvori', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
      return;
    }






    
    const cartItem: CartModel = {
      movieTitle: this.movie?.title || 'Nepoznat film',
      numberOfTickets: this.numberValue,
      ticketPrice: this.ticketPrice || 0,
      status: 'rezervisano'
    };
    
  
    const existingCart = localStorage.getItem('cartItems');
    let cart: CartModel[] = existingCart ? JSON.parse(existingCart) : [];
  
    const existingIndex = cart.findIndex(item => item.movieTitle === cartItem.movieTitle);
  
    if (existingIndex !== -1) {
      cart[existingIndex].numberOfTickets = this.numberValue;
    } else {
      cart.push(cartItem);
    }
  
    localStorage.setItem('cartItems', JSON.stringify(cart));
  

    const snackBarRef = this.snackBar.open(`Karte su uspešno sačuvane.`, 'Vidi korpu', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });

    snackBarRef.onAction().subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }
}
