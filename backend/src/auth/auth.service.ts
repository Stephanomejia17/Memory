import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  logout() {
    return { message: 'Sesión cerrada exitosamente' }; // HU2
  }
}