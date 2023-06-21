import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SigespService } from 'sigesp';

@Injectable()
export class HeaderHttpInterceptor implements HttpInterceptor {
  constructor(private _sigesp: SigespService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let updatedRequest = request.clone({
      headers: this._sigesp.getHttpHeaders(),
    });
    return next.handle(updatedRequest);
  }
}
