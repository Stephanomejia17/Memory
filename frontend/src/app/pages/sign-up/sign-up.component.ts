import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  registryForm = this.fb.group({
    typeDocument: ['', [Validators.required]],
    document: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rePassword: ['', [Validators.required]]
  });

  onRegistry(){

    if (this.registryForm.invalid) {
      alert('Formulario no válido');
      return;
    }

    const formValue = this.registryForm.value;

    if (formValue.password !== formValue.rePassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const { rePassword: _, ...userRegistry } = formValue;
    this.authService.registry(userRegistry);
    this.registryForm.reset();
  }

}
