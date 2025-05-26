import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SolicitudService } from '../../shared/services/solicitud.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-solicitud-sin-plan',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './solicitud-sin-plan.component.html',
  styleUrls: ['./solicitud-sin-plan.component.css']
})

export class SolicitudSinPlanComponent implements OnInit {
  

  deceasedName: string = '';
  deceasedId: string = '';

  requesterName: string = '';
  requesterLastName: string = '';
  selectedDocType: string = ''; 
  requesterId: string = '';
  requesterEmail: string = '';

  selectedLocation: string = 'DIRECCION REGITRADA';
  selectedVelacionTime: string = '1 HORA';
  selectedCremacion: string = 'NO';
  selectedSala: string = 'MONTESACRO';

  nombreServicio: string = '';
  precioServicio: string = '';


  constructor(private router: Router, private solicitudService: SolicitudService, private route: ActivatedRoute) { }

  ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.nombreServicio = params['nombre'] || '';
    this.precioServicio = params['precio'] || '0';
    console.log('Servicio:', this.nombreServicio, 'Precio:', this.precioServicio);
  });
}

  selectOption(group: string, option: string): void {
    switch (group) {
      case 'location':
        this.selectedLocation = option;
        break;
      case 'velacion':
        this.selectedVelacionTime = option;
        break;
      case 'cremacion':
        this.selectedCremacion = option;
        break;
      case 'sala':
        this.selectedSala = option;
        break;
      default:
        console.warn('Grupo de opción desconocido:', group);
    }
    console.log(`Seleccionado en ${group}: ${option}`);
  }

  submitRequest(): void {
    Swal.fire({
      title: 'Simulación de Pago',
      html: `
        <h2>Servicio seleccionado: ${ this.nombreServicio }</h2>
        <img src="/pngwing.com.png" alt="Logo o imagen" width="200">
        <input id="cardNumber" class="swal2-input" placeholder="Número de tarjeta" maxlength="16">
        <input id="cardName" class="swal2-input" placeholder="Nombre en la tarjeta">
        <input id="expiry" class="swal2-input" placeholder="MM/AA" maxlength="5">
        <input id="cvv" class="swal2-input" placeholder="CVV" maxlength="3" type="password">
        <h2>$ ${this.precioServicio}</h2>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Pagar',
      preConfirm: () => {
        const cardNumber = (document.getElementById('cardNumber') as HTMLInputElement).value;
        const cardName = (document.getElementById('cardName') as HTMLInputElement).value;
        const expiry = (document.getElementById('expiry') as HTMLInputElement).value;
        const cvv = (document.getElementById('cvv') as HTMLInputElement).value;
        const amount = this.precioServicio;

        if (!cardNumber || !cardName || !expiry || !cvv || !amount) {
          Swal.showValidationMessage('Por favor completa todos los campos');
          return false;
        }

        return {
          cardNumber, cardName, expiry, cvv, amount
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulamos procesamiento del pago
        Swal.fire({
          title: 'Procesando pago...',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        }).then(() => {
          Swal.fire({
            icon: 'success',
            title: '¡Pago exitoso!',
            text: `Pago simulado de $${result.value.amount} completado.`,
            confirmButtonText: 'Continuar'
          }).then(() => {
            // Si el pago fue exitoso, se envía la solicitud
            const solicitudData = {
              deceased: {
                name: this.deceasedName,
                id: this.deceasedId
              },
              requester: {
                type_id: this.selectedDocType,
                id: this.requesterId,
                name: this.requesterName,
                last_name: this.requesterLastName,
                email: this.requesterEmail,
                name_service: 'Servicio Funerario Sin Plan',
              },
              serviceDetails: {
                location: this.selectedLocation,
                velacionTime: this.selectedVelacionTime,
                cremacion: this.selectedCremacion,
                sala: this.selectedSala
              }
            };

            this.solicitudService.enviarSolicitudSinPlan(solicitudData).subscribe({
              next: () => {
                this.router.navigate(['/confirm']);
              },
              error: (error) => {
                console.error('Error al enviar la solicitud:', error);
              }
            });
          });
        });
      }
    });
  }

}