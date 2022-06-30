import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader = window.btoa(`${environment.authenticationUser.login}:${environment.authenticationUser.password}`);
    const request = req.clone({ setHeaders: {
        Authorization: `Basic ${authHeader}`
      }});

    return next.handle(request);
  }

}
