import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { PaymentService } from '../../shared/services/payment.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

const API_BASE_URL = 'http://localhost:3000';
@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent { 
  nombrePlan: string = ''; 

  constructor(
    private router: Router,
    private authService: AuthService,
    private paymentService: PaymentService,
    private route: ActivatedRoute) { 

  }



  verifyPlan(queryParams: any): void {
    console.log('Verificando plan activo...');
    const nameplan = queryParams['name'] || 'defaultPlanName'; 
    console.log('Nombre del plan:', nameplan);
  
    this.paymentService.verifyPlan().subscribe({
      next: (plan) => {

        const continuar = confirm('Tienes un plan activo. ¿Deseas cambiarlo?');
        if (continuar) {
          
          this.paymentService.updatePlan({name:nameplan}).subscribe({
            next: () => {
              console.log('Plan actualizado');
              Swal.fire({
                icon: 'success',
                title: 'Plan actualizado',
                text: 'Tu plan ha sido actualizado exitosamente.',
              });
            },
            error: (err) => {
              console.error('Error al actualizar plan:', err);
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
