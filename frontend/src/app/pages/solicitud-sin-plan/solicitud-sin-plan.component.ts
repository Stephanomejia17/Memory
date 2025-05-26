import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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


  constructor(private router: Router) { }

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
        name: this.requesterName,
        lastName: this.requesterLastName,
        docType: this.selectedDocType, 
        id: this.requesterId,
        email: this.requesterEmail
      },
      serviceDetails: {
        location: this.selectedLocation,
        velacionTime: this.selectedVelacionTime,
        cremacion: this.selectedCremacion,
        sala: this.selectedSala
      }
    };

    console.log('Datos de la Solicitud sin Plan:', solicitudData);

    this.router.navigate(['/confirm']);
  }
}