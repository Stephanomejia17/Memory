import { Injectable, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import {catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedUser = signal(false); 
  private apiUrl = 'http://localhost:3000';
  router = inject(Router);

  LoggedUser() {
    return this.isLoggedUser(); 
  }

  
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    return this.http.post<User>(`${this.apiUrl}/users/login`, user).pipe(
      tap(() => {
        this.showSuccess('Bienvenido a Memory');
        //sessionStorage.setItem('userLogged', 'true');
        this.isLoggedUser.set(true)
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

    this.http.post(`${this.apiUrl}/users/logout`, null, {
      withCredentials: true
    }).subscribe({
      next: () => {
        this.showSuccess('Sesión cerrada exitosamente');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error cerrando sesión', err);
      }
    });
  
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

  getProfile(): Observable<any> {
    const user =this.http.get(`${this.apiUrl}/users/get`)
    console.log("HHHH",user)
    return user
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
