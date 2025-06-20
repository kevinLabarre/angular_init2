import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  service = inject(AuthService)

  loginForm = new FormGroup(
    {
      login: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
    }
  );

  handleSubmit() {
    if (this.loginForm.valid) {
      console.log("envoie de la requete")
      const login = {
        login: this.loginForm.value.login || "",
        password: this.loginForm.value.password || ""
      }
      this.service.fakeLogin(login).subscribe({
        // next: resp => localStorage.setItem("token", resp.token),
        // next: resp => sessionStorage.setItem("token", resp.token),
        error: e => console.error(e.message),
      })
    } else console.log("Formulaire non valide")
  }

}
