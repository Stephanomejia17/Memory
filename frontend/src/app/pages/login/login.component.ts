import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormsModule, HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  types= [
    { id:'CC' ,name: 'Cédula de Ciudadanía' },
    { id:'TI' ,name: 'Tarjeta de Identidad' },
    { id:'CE' ,name: 'Cédula de Extranjería' },
    { id:'PA' ,name: 'Pasaporte' },
    { id:'RC' ,name: 'Registro Civil' },
    { id:'PE' ,name: 'Permiso Especial de Permanencia' },];

  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);
 

  loginForm = this.fb.group({
    type_id: [ '',[Validators.required]],
    id: ['', [Validators.required, Validators.minLength(5)]],
    password: ['', [Validators.required]]
  });

  onLogin(){
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    console.log('bton clicked');
    if (this.loginForm.invalid) {
      alert('Verifique todos los campos');
      return;
    }

    const user = this.loginForm.value;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);
        this.router.navigate(['/deceased']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
      }
    });

    
  }
}
