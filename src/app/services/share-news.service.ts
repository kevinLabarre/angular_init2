import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { News } from '../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class ShareNewsService {

  private news = new BehaviorSubject<News>({
    id: 0,
    categorie: '',
    titre: '',
    texte: '',
    datePublication: new Date(),
    dateModification: new Date(),
    image: ''
  })

  news$ = this.news.asObservable();

  updateNews(news: News) {
    this.news.next(news)
  }

}
