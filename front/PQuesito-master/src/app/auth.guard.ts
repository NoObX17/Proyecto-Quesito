import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

//Este archivo compruba si existe un token o no para evitar que un usuario pueda acceder a las diferentes páginas sin logearse
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificar si el token está presente en el almacenamiento local
    const token = localStorage.getItem('token');

    if (token) {
      // El usuario ha iniciado sesión, permitir la navegación
      return true;
    } else {
      // El usuario no ha iniciado sesión, redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
