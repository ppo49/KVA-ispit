import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MovieService } from '../services/main.service';
import { AsyncPipe, DatePipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { AxiosError } from 'axios';
import { MovieModel } from '../models/movie.model';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    /*JsonPipe,*/
    NgIf, NgFor,
    MatSlideToggleModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
    DatePipe,
    RouterLink,
    MatProgressBarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public movies: MovieModel[] | null = null;
  public error: string | null = null;
  public filteredMovies$: Observable<MovieModel[]> | null = null;

  searchControl = new FormControl('');

  constructor() {

    new MovieService().getMovies()
      .then((rsp: MovieModel[]) => {
        this.movies = rsp;
        this.filteredMovies$ = this.searchControl.valueChanges.pipe(
          startWith(''),
          map(value => this.filterMovies(value || ''))
        );
      })
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`);
      
  }

  private filterMovies(query: string): MovieModel[] {
    if (!this.movies) return [];
    const lowerQuery = query.toLowerCase();
    return this.movies.filter(movie =>
      movie.title.toLowerCase().includes(lowerQuery) ||
      movie.originalTitle.toLowerCase().includes(lowerQuery) ||
      movie.director.name.toLowerCase().includes(lowerQuery) ||
      movie.movieActors.some(actor => actor.actor.name.toLowerCase().includes(lowerQuery)) ||
      movie.movieGenres.some(genre => genre.genre.name.toLowerCase().includes(lowerQuery)) ||
      movie.startDate.toLowerCase().includes(lowerQuery)
    );
  }
}
