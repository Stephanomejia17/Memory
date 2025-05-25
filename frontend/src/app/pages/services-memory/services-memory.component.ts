import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [NgIf, HeaderComponent, RouterModule],
  templateUrl: './services-memory.component.html',
  styleUrls: ['./services-memory.component.css']
})
export class ServiceComponent {
  mostrarVistaPerfil = false;

  constructor(private router: Router) { }

  solicitarAfiliado() {
    console.log('Botón de Afiliado clickeado. Redirigiendo a la vista de afiliado');
    this.router.navigate(['/solicitar-afiliado']);
  }

  solicitarSinPlan() {
    console.log('Botón de Sin Plan clickeado');
  }
}
