import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-details',
  imports: [],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent {

  id!: number

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => this.id = params['id']);  // -> parce que notre paramètre est nommé ":id" au niveau de la déclaration de la route
  }
}
