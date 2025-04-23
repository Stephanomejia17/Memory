import { Injectable, signal } from '@angular/core';
import Swal from 'sweetalert2';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSignedUser: any;

  constructor() { }

  login(user: User): boolean {
    // Validación previa
    if (!user.document || !user.password) {
      this.showError('Faltan campos obligatorios');
      return false;
    }

    const userStr = localStorage.getItem(user.document);
    if (userStr) {
      const userDB: User = JSON.parse(userStr);

      if (user.password === userDB.password) {
        sessionStorage.setItem('userLogged', JSON.stringify(userDB));
        this.isSignedUser.set(true);
        return true;
      }
    }

    this.showError('Credenciales no válidas');
    return false;
  }

  logout(): void {
    sessionStorage.clear();
    this.isSignedUser.set(false);
  }

  getUser(): User | null {
    const userStr = sessionStorage.getItem('userLogged');
    return userStr ? JSON.parse(userStr) : null;
  }

  registry(user: User): void {
    if (!user.document) {
      this.showError('El campo documento es obligatorio');
      return;
    }

    localStorage.setItem(user.document, JSON.stringify(user));
  }

  private isUserLogged(): boolean {
    return !!sessionStorage.getItem('userLogged');
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
}
