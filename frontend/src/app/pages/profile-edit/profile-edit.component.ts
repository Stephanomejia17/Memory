import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

const API_BASE_URL = 'http://localhost:3000';

export interface Member {
  type_id: string;
  id: string;
  name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
}

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})

export class ProfileEditComponent implements OnInit{
  profileForm: FormGroup;
  currentPlanId: number | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.profileForm = this.fb.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      type_id: ['', [Validators.required]],
      id: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });    
  }

  ngOnInit(): void {
    this.getCurrentUserPlanId();
  }

  getCurrentUserPlanId(): void {
    this.http.get<{ planId: number }>(`${API_BASE_URL}/users/planId`).subscribe({
      next: (data) => {
        this.currentPlanId = data.planId;
        console.log('Plan ID obtenido:', this.currentPlanId);
      },
      error: (error) => {
        console.error('Error al obtener el plan del usuario:', error);
        alert('No se pudo obtener el plan del usuario actual.');
      }
    });
  }

  onSave() {
  this.profileForm.markAllAsTouched();
  this.profileForm.updateValueAndValidity();

  if (this.profileForm.invalid) {
    console.log('Formulario inválido. Errores por campo:');
    Object.entries(this.profileForm.controls).forEach(([key, control]) => {
      if (control.invalid) {
        console.log(`Campo ${key}:`, control.errors);
      }
    });

    alert('Formulario no válido');
    return;
  }

  const formData = this.profileForm.value;
  console.log('Formulario válido:', formData);

  this.addMember(formData);

  this.profileForm.reset();
}

addMember(member: Member): void {
    if(!this.currentPlanId) {
      console.error('No hay plan seleccionado para agregar un miembro');
      return;
    }

    const api = {
      id: this.currentPlanId!,
      member: {
        type_id: member.type_id,
        id: member.id,
        name: member.name,
        last_name: member.last_name,
        email: member.email,
        password: member.password,
        phone: member.phone,
        address: member.address,
        city: member.city
      }
    };

    this.http.post(`${API_BASE_URL}/plans/addMember`, api).subscribe({
      next: (newMember) => {
        console.log('Miembro agregado exitosamente: ', newMember);
        alert('Miembro agregado correctamente')
        this.router.navigate(['/deceased']);
      },
      error: (error) => {
        console.error('Error al agregar miembro: ', error);
        alert('Error al agregar al miembro');
      }
    });

  }

}
