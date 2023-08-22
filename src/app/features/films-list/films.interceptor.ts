import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class FilmsInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes('themoviedb')) {
      const clonedReq = request.clone({
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + environment.movies.token_api_key
        ),
      });
      return next.handle(clonedReq);
    }
    return next.handle(request);
  }
}
