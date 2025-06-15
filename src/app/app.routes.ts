import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'movie/:id', component: MovieDetailComponent },
    { path: 'cart', component: CartComponent},
    { path: 'login', component: LoginComponent },
    { path: 'user', component: UserComponent },
    {path: 'register',component: RegisterComponent},
    { path: '**', redirectTo: '' }
];