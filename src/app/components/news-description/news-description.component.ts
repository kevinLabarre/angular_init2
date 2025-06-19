import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShareNewsService } from '../../services/share-news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-news-description',
  imports: [],
  templateUrl: './news-description.component.html',
  styleUrl: './news-description.component.css'
})
export class NewsDescriptionComponent implements OnInit, OnDestroy {

  constructor(private service: ShareNewsService) { }

  private subscription: Subscription = new Subscription();

  description: string = ""

  ngOnInit(): void {
    this.subscription = this.service.news$.subscribe({
      next: resp => resp.id !== 0 ? this.description = resp.texte : this.description = ""
    })

  }

  // Pas besoin de se désabonner quand on travaille avec les observable de HTTP client
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
