import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService,
    private router: Router) { }

  canActivate(): Observable<boolean> | boolean {
    const token = this.tokenService.getToken();
    if (token) {
      return true;
    } else {
      localStorage.clear();
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}