import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';

@Component({
  selector: 'app-filtro-integrados',
  templateUrl: './filtro-integrados.component.html',
  styleUrls: ['./filtro-integrados.component.scss'],
})
export class FiltroIntegradosComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar = false;
  tiposProceso = TIPOS_PROCESO;
}
