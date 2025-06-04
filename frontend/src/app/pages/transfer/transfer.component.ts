import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  memberName: string = '';
  memberIdentity: string = '';

  selectedLocation: string = 'DIRECCION REGITRADA';
  selectedVelacionTime: string = '1 HORA';
  selectedCremacion: string = 'NO';
  selectedSala: string = 'MONTESACRO';

  customLocationAddress: string = '';
  customVelacionInput: string = '';
  customCremacionInput: string = '';
  customSalaInput: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { } 

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const name = params.get('name');
      const id = params.get('id');
      this.memberName = name ? decodeURIComponent(name) : '';
      this.memberIdentity = id ? decodeURIComponent(id) : '';
      console.log('Nombre del miembro:', this.memberName);
      
    });
  }

  selectOption(group: string, option: string): void {
    switch (group) {
      case 'location':
        this.selectedLocation = option;
        if (option !== 'INGRESAR DIRECCION') {
          this.customLocationAddress = '';
        }
        break;
      case 'velacion':
        this.selectedVelacionTime = option;
        if (option !== 'OTRA HORA') {
          this.customVelacionInput = '';
        }
        break;
      case 'cremacion':
        this.selectedCremacion = option;
        if (option !== 'OTRO TIPO') {
          this.customCremacionInput = '';
        }
        break;
      case 'sala':
        this.selectedSala = option;
        if (option !== 'OTRA SALA') {
          this.customSalaInput = '';
        }
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
      location: this.selectedLocation === 'INGRESAR DIRECCION' ? this.customLocationAddress : this.selectedLocation,
      velacionTime: this.selectedVelacionTime === 'OTRA HORA' ? this.customVelacionInput : this.selectedVelacionTime,
      cremacion: this.selectedCremacion === 'OTRO TIPO' ? this.customCremacionInput : this.selectedCremacion,
      sala: this.selectedSala === 'OTRA SALA' ? this.customSalaInput : this.selectedSala
    };
    console.log('Datos del formulario confirmados:', formData);

    this.router.navigate(['/confirm']); 
  }
}