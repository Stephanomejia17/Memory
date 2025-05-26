import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgIf,  RouterOutlet, RouterModule],
  templateUrl: './services-memory.component.html',
  styleUrls: ['./services-memory.component.css']
})

export class ServiceComponent {
  mostrarVistaPerfil = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  solicitarAfiliado() {
    console.log('Botón de Afiliado clickeado.');
    if (this.authService.isLoggedUser()) {
      console.log('Usuario logeado. Redirigiendo a /profile');
      this.router.navigate(['/profile']);
    } else {
      console.log('Usuario no logeado. Redirigiendo a /login');
      this.router.navigate(['/login']);
    }
  }

  solicitarSinPlan() {
    console.log('Botón de Sin Plan clickeado. Redirigiendo a /solicitud-sin-plan');
    this.router.navigate(['/solicitud-sin-plan']); 
  }
}