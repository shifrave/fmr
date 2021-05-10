import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

// save Authorization header
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem('access_token');
    const authHeader = 'Authorization';
    const headersConfig = {};

    if (accessToken) {
      headersConfig[authHeader] = `Bearer ${accessToken}`;
    }

    return next.handle(request.clone({
      setHeaders: headersConfig
    }));
  }
}
