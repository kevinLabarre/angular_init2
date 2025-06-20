import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../../interfaces/news.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.newsUrl

  getNews(): Observable<News[]> {
    return this.http.get<News[]>(this.baseUrl)
  }

  getNewsById(id: number): Observable<News> {
    return this.http.get<News>(`${this.baseUrl}/${id}`)
  }

  createNews(news: News) {
    return this.http.post(this.baseUrl, news)
  }

}
