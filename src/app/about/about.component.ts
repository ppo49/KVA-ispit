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
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  imports: [
    /*JsonPipe,*/
    MatSlideToggleModule,
    MatTableModule,
    MatCardModule,
    MatGridListModule,
   
    MatProgressBarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
   
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AboutComponent {

}
