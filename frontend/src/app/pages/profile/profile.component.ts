import { Component, OnInit } from '@angular/core';
import { RouterModule,Router, } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormGroup,FormBuilder,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  perfilForm :FormGroup;

  constructor(
    private authService : AuthService,
    private fb: FormBuilder,
  ) {
    this.perfilForm = this.fb.group({
      id:[''],
      name:[''],
      lastname:[''],
      password:[''],
      email:[''],
      adress:[''],
      phone:[''],

  
    });
  }
 


  ngOnInit(): void{
    this.authService.getProfile().subscribe({
    next: (profile) => {
      console.log('Perfil del usuario:', profile);
      this.perfilForm.patchValue({
        id: profile.user.id,
        name: profile.user.name,
        lastname: profile.user.lastname,
        password: profile.user.password,
        email: profile.user.email,
        adress: profile.user.adress,
        phone: profile.user.phone
      });
      console.log("eeeee#",this.perfilForm.value)
    },
    error: (err) => {
      console.error('Error al obtener perfil', err);
    }
  });
  }
}

