import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  private apiUrl = 'http://localhost:3000';
  router = inject(Router);

  constructor(private http: HttpClient) {}

  enviarSolicitudSinPlan(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/solicitarServicioNoRegistrado`, data).pipe(
        tap(() => {
            this.showSuccess('Servicio solicitado exitosamente');
        }),
        catchError(err => {
            this.showError('Error al solicitar el servicio');
            return throwError(() => err);
        })
    );
  }

  private showError(message: string): void {
      Swal.fire({
        title: 'Oops...',
        text: message,
        icon: 'error',
        width: 600,
        padding: '3em',
        color: '#716add',
        backdrop: `rgba(0,0,123,0.4) left top no-repeat`
      });
    }
  
    private showSuccess(message: string): void {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: message,
        width: 600,
        padding: '3em',
        color: '#716add',
        backdrop: `rgba(0,0,123,0.4) left top no-repeat`
      });
    }
}
