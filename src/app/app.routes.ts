import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyNavBarComponent } from './my-nav-bar/my-nav-bar.component';
import { MovieComponent } from './movie/movie.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'Home', component: HomeComponent},
    {path: 'MyNavBar', component: MyNavBarComponent},
    {path: 'movie/:id', component: MovieComponent},
    {path: '**', redirectTo: '' }
];
