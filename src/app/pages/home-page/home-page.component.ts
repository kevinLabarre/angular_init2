import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareNewsService } from '../../services/share-news.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {

  idValue: number = 1;
  private subscription: Subscription = new Subscription();

  NewsDescription: string = ""


  constructor(private router: Router, private service: ShareNewsService) { }
  ngOnInit(): void {
    this.subscription = this.service.news$.subscribe({
      next: resp => resp.id !== 0 ? this.NewsDescription = resp.texte : this.NewsDescription = ""
    })
  }

  handleRedirect() {
    this.router.navigate(['news-details', this.idValue]);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
