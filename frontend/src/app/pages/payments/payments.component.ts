import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PaymentService } from '../../shared/services/payment.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent {

  nombrePlan: string = '';

  constructor(
    private router: Router,
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) {
    
    this.route.queryParams.subscribe(params => {
      this.nombrePlan = params['name'] || '';
      console.log('Servicio recibido por queryParam:', this.nombrePlan);
    });
  }

  verifyPlan() { 
    console.log('Verificando plan activo...');
    this.paymentService.verifyPlan().subscribe();

  }

 

  submitRequest() {
    this.verifyPlan();
   
    const data = {
      nombrePlan: this.nombrePlan
    };

    this.paymentService.paymentPlan(data).subscribe();
}}
