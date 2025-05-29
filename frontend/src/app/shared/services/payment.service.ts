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
export class PaymentService {
  private apiUrl = 'http://localhost:3000';
  router = inject(Router);

  constructor(private http: HttpClient) {}

  verifyPlan(): Observable<any> {
    console.log('verifyPlan called');
    return this.http.get(`${this.apiUrl}/plans/all`).pipe(
      tap(() => {
        console.log('Planes obtenidos exitosamente');
      }),
      catchError(err => {
        this.showError('Error al obtener los planes');
        return throwError(() => err);
      })
    );
  }

  deletePlan():Observable<any> {
    console.log('borrando plan');
    return this.http.delete(`${this.apiUrl}/plans/delete`,{ withCredentials: true } )
  }

  paymentPlan(data: any): Observable<any> {
    console.log('paymentPlan called with data:', data);
    return this.http.post(`${this.apiUrl}/plans/create`, data).pipe(
        tap(() => {
            console.log('Plan creado exitosamente',data);
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
