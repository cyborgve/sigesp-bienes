import { Component, ViewChild } from '@angular/core';
import { Integracion } from '@core/models/procesos/integracion';

@Component({
  selector: 'app-plural-integracion',
  templateUrl: './plural-integracion.component.html',
  styleUrls: ['./plural-integracion.component.scss'],
})
export class PluralIntegracionComponent {
  titulo = 'integraciones';

  porAprobar: Integracion[] = [];
  porIntegrar: Integracion[] = [];
}
