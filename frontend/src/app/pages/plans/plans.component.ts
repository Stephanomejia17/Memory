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


  verifyPlan(queryParams:any): void { 
    console.log('Verificando plan activo...');
    const plan = this.paymentService.verifyPlan().subscribe();
    if(plan) {
      const continuar = confirm('Tienes un plan activo. ¿Deseas cambiarlo?');
        if (continuar) {
          const DELETE = this.paymentService.deletePlan().subscribe();
          this.router.navigate(['/payments'], { queryParams });
        }
    }else{
      this.router.navigate(['/payments'], { queryParams })
    }
  } 
  
}
