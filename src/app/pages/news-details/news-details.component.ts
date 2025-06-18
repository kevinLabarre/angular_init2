import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from '../../services/news/news.service';
import { News } from '../../interfaces/news.interface';
import { NewsCardComponent } from "../../components/news-card/news-card.component";

@Component({
  selector: 'app-news-details',
  imports: [NewsCardComponent],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent implements OnInit {

  id!: number

  news?: News

  constructor(private activatedRoute: ActivatedRoute, private service: NewsService) {
    this.activatedRoute.params.subscribe(
      params => this.id = params['id']
    );  // -> parce que notre paramètre est nommé ":id" au niveau de la déclaration de la route
  }

  // Recommandation 'angular' : utiliser le onInit pour les chargements de données asynchrone
  ngOnInit(): void {
    if (this.id > 0) {
      this.service.getNewsById(this.id).subscribe({
        next: (response) => this.news = response,
        error: (e) => console.error(e.message)
      })
    }
  }

}
