import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { PaymentService } from '../../shared/services/payment.service';
import Swal from 'sweetalert2';
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


  verifyPlan(queryParams: any): void {
    console.log('Verificando plan activo...');
  
    this.paymentService.verifyPlan().subscribe({
      next: (plan) => {
        // ✅ Si hay un plan, preguntar si desea cambiarlo
        const continuar = confirm('Tienes un plan activo. ¿Deseas cambiarlo?');
        if (continuar) {
          this.paymentService.deletePlan().subscribe({
            next: () => {
              console.log('Plan borrado');
              this.router.navigate(['/payments'], { queryParams });
            },
            error: (err) => {
              console.error('Error al borrar plan:', err);
            }
          });
        }
      },
      error: (err) => {
        this.router.navigate(['/payments'], { queryParams });
      }
    });
  }
  
  
}
