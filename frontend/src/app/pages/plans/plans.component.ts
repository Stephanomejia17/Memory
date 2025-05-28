import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { PaymentService } from '../../shared/services/payment.service';
@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent { 

  constructor(
    private router: Router,
    private authService: AuthService,
    private paymentService: PaymentService,) { 
  }


  SolicitarPlan() {
    console.log('Botón de Solicitar Plan clickeado.');
    if (this.authService.isLoggedUser()) {
      console.log('Usuario logeado. Redirigiendo a /payment');
      this.router.navigate(['/payment']);
    }

}
}