import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyNavBarComponent } from './my-nav-bar/my-nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MyNavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FilmFreak-Angular';
}
