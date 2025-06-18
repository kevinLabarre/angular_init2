import { Component, Input } from '@angular/core';
import { News } from '../../interfaces/news.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-news-card',
  imports: [RouterLink],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.css'
})
export class NewsCardComponent {
  @Input({ required: true }) news?: News
}
