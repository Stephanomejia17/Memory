import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl:'./sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

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

  registryForm = this.fb.group({
    type_id: ['', [Validators.required]],
    id: ['', [Validators.required, Validators.minLength(5)]],
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]],
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
