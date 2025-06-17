import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  idValue: number = 1;

  constructor(private router: Router) { }

  handleRedirect() {
    this.router.navigate(['news-details', this.idValue]);
  }

}
