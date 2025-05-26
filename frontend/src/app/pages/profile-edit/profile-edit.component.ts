import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder) {
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

  onSave() {
    if (this.profileForm.invalid) {
      alert('Formulario no válido');
      return;
    }

    const formData = this.profileForm.value;

    console.log('Formulario válido:', formData);

    this.profileForm.reset();
  }
}
