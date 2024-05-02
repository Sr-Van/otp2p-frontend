import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const login = inject(LoginService)

  const token = login.getToken()

  const cloneReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  })

  return next(cloneReq)
};
