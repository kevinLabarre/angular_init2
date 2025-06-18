import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NewsService } from '../../services/news/news.service';
import { News } from '../../interfaces/news.interface';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-news',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

  news?: News[]

  constructor(private service: NewsService) {
    // this.service.getNews().subscribe(response => this.news = response)

    this.service.getNews().subscribe({
      next: (response) => {
        this.news = response
        console.log(this.news)
      },
      error: (e) => console.log(e.message),
      complete: () => console.log("Requête terminée !")
    })
  }

  async Load() {
    this.news = await lastValueFrom(this.service.getNews())
  }


}
