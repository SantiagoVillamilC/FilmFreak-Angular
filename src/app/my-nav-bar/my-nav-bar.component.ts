import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-my-nav-bar',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './my-nav-bar.component.html',
  styleUrl: './my-nav-bar.component.css'
})
export class MyNavBarComponent {

}
