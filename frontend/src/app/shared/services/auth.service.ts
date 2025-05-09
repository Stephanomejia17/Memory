import { Injectable, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedUser = signal(false); 
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/login`, user).pipe(
      tap((userLogged: User) => {
        this.showSuccess('Bienvenido a Memory');
        sessionStorage.setItem('userLogged', JSON.stringify(userLogged));
        this.isLoggedUser.set(true);
      }),
      catchError(err => {
        this.showError('Usuario o contraseña incorrectos');
        return throwError(() => err);
      })
    );

  }

  logout(): void {
    sessionStorage.removeItem('userLogged');
    sessionStorage.clear();
    this.isLoggedUser.set(false);
  }

  getUser(): User | null {
    const userStr = sessionStorage.getItem('userLogged');
    return userStr ? JSON.parse(userStr) : null;
  }

  registry(user: User): void {
    this.http.post(`${this.apiUrl}/users/signup`, user).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.showSuccess('Usuario registrado exitosamente');
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        this.showError('Error al registrar usuario. Intenta nuevamente.');
      }
    });
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
