import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';

@Component({
  selector: 'app-filtro-registrados',
  templateUrl: './filtro-registrados.component.html',
  styleUrls: ['./filtro-registrados.component.scss'],
})
export class FiltroRegistradosComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar = false;
  tiposProceso = TIPOS_PROCESO;
}
