import { Component } from '@angular/core';
import { MyNavBarComponent } from '../my-nav-bar/my-nav-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MyNavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
