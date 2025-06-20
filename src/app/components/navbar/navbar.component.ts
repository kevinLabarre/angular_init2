import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  service = inject(AuthService)

  isAuth = toSignal(this.service.isAuthenticated$)
  buttonValue = computed(() => this.isAuth() ? "Se déconnecter" : "Se connecter")

  logout() {
    this.service.logout()
  }

}
