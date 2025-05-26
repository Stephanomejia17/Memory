import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer-standard', 
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './transfer-standard.component.html', 
  styleUrls: ['./transfer-standard.component.css'] 
})
export class TransferStandardComponent implements OnInit {

  memberName: string = '';
  memberIdentity: string = '';

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

  confirmChanges(): void {
    const formData = {
      name: this.memberName,
      identity: this.memberIdentity,
      location: this.selectedLocation, 
      velacionTime: this.selectedVelacionTime, 
      cremacion: this.selectedCremacion, 
      sala: this.selectedSala 
    };
    console.log('Datos del formulario de Transferencia STANDARD confirmados:', formData);
    this.router.navigate(['/confirm']);
  }
}