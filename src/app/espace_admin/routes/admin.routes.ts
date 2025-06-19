import { HomePageComponent } from "../../pages/home-page/home-page.component";
import { NewsComponent } from "../../pages/news/news.component";

export const ADMIN_ROUTES = [
  { path: '', component: HomePageComponent, title: "Page d'accueil" },
  { path: 'news', component: NewsComponent, title: 'News' }
]
