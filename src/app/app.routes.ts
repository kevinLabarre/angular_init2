import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NewsComponent } from './pages/news/news.component';
import { NewsDescriptionComponent } from './components/news-description/news-description.component';
import { AddNewsComponent } from './components/add-news/add-news.component';
import { RemoveNewsComponent } from './components/remove-news/remove-news.component';
import { NewsDetailsComponent } from './pages/news-details/news-details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AccountComponent } from './pages/account/account.component';
import { SignalsComponent } from './signals/signals.component';
import { ADMIN_ROUTES } from './espace_admin/routes/admin.routes';
import { LoginComponent } from './pages/login/login.component';
import { adminGuard } from './espace_admin/guards/admin.guard';

export const routes: Routes = [
  { path: "", component: HomePageComponent, title: "Page d'accueil" },
  {
    path: "news", component: NewsComponent, title: "Nos actualités", children: [
      {
        // Redirige uniquement si l'URL est exactement "/news"
        path: "", redirectTo: "description", pathMatch: "full"
      },
      { path: "description", component: NewsDescriptionComponent },
      { path: "ajouter", component: AddNewsComponent },
      { path: "supprimer", component: RemoveNewsComponent }
    ]
  },
  {
    path: "news-details/:id",
    component: NewsDetailsComponent,
    title: "détail actualité"
  },
  { path: "compte-bancaire", component: AccountComponent, title: "Comptes bancaire" },
  { path: "signals", component: SignalsComponent, title: "Les signaux" },

  { path: "se-connecter", component: LoginComponent, title: "Se connecter" },

  // ESPACE ADMIN
  {
    path: "admin",
    // component: AdminLayoutComponent, //-> Chargement 'classique'
    loadComponent: () => import('./espace_admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    title: "Espace admin",
    children: ADMIN_ROUTES,
    canActivate: [adminGuard],
    // canActivateChild: []
  },

  // Page 404
  { path: "**", component: NotFoundComponent }

];
