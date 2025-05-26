import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SolicitudService } from '../../shared/services/solicitud.service';

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


  constructor(private router: Router, private solicitudService: SolicitudService) { }

  ngOnInit(): void {
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

    console.log('Datos de la Solicitud sin Plan:', solicitudData);
    this.solicitudService.enviarSolicitudSinPlan(solicitudData).subscribe({
      next: () => {
        this.router.navigate(['/confirm']);
      },
      error: (error) => {
        console.error('Error al enviar la solicitud:', error);
      }
    });
  }
}