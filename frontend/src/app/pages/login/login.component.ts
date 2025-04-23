import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  loginForm = this.fb.group({
    typeDocument: ['', [Validators.required, Validators.minLength(3)]],
    document: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required]]
  });

  onLogin(){
    if (this.loginForm.invalid) {
      alert('Verifique todos los campos');
      return;
    }

    const user = this.loginForm.value;
    const success = this.authService.login(user);

    if (!!success) {
      const url = sessionStorage.getItem('redirecTo') || 'home';
      this.router.navigateByUrl(url);
    }
  }
}
