import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const API_BASE_URL = 'http://localhost:3000';

export interface ApiMember {
  type_id: string;
  id: string;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export interface Member extends ApiMember {
  planType: 'STANDARD' | 'PREMIUM' | 'BASIC';
}

@Component({
  selector: 'app-deceased',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './deceased.component.html',
  styleUrl: './deceased.component.css'
})
export class DeceasedComponent implements OnInit {
  members: Member[] = [];
  currentPlanId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.getCurrentUserPlanIdAndLoadMembers();
  }

  getCurrentUserPlanIdAndLoadMembers(): void {
    this.http.get<{ planId: number }>(`${API_BASE_URL}/users/planId`).subscribe({
      next: (data) => {
        this.currentPlanId = data.planId;
        console.log('Plan ID obtenido:', this.currentPlanId);
        if (this.currentPlanId) {
          this.loadMembers(this.currentPlanId);  // PASAR planId aquí
        } else {
          console.warn('Plan ID no válido');
        }
      },
      error: (error) => {
        console.error('Error al obtener el plan del usuario:', error);
        alert('No se pudo obtener el plan del usuario actual.');
      }
    });
  }

  loadMembers(planId: number): void {
    this.http.get<ApiMember[]>(`${API_BASE_URL}/plans/${planId}/members`).subscribe({
      next: (apiMembers) => {
        this.members = apiMembers.map(member => ({
          ...member,
          planType: this.determinePlanType(member)
        }));
      },
      error: (error) => {
        console.error('Error cargando miembros:', error);
      }
    });
  }


  private determinePlanType(member: any): 'STANDARD' | 'PREMIUM' | 'BASIC' {
    return 'STANDARD';
}

  onSelect(member: Member): void {
    console.log('Miembro seleccionado:', member);
   
    this.router.navigate(['/transfer'], {
      queryParams: {
        name: member.name,
        id: member.id,
      }
    });
  }

  deleteMember(member: Member): void {
    if (confirm(`¿Estás seguro de que deseas eliminar a ${member.name} ${member.last_name}?`)) {
      console.log(this.currentPlanId)
      const body = {
        id: this.currentPlanId, 
        member: {
          type_id: member.type_id,
          id: member.id,
        }};
      console.log('Eliminando miembro:', body);
      this.http.post(`${API_BASE_URL}/plans/removeMember`, body).subscribe({
        next: () => {
          alert('Miembro eliminado correctamente.');
          if (this.currentPlanId) {
            this.loadMembers(this.currentPlanId);  // 👈 Recarga la lista de miembros
          }
        },
        error: (error) => {
          console.error('Error al eliminar el miembro:', error);
          alert('No se pudo eliminar al miembro.');
        }
      });
    }
  }
}