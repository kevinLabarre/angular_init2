import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-news',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

}
