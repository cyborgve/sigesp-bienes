import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IntegracionService {
  private apiUrl = 'dao/sbn/integrar-bienes-dao.php';

  constructor(private _http: HttpClient) {}

  integrar() {}
  reversarIntegracion() {}
}
