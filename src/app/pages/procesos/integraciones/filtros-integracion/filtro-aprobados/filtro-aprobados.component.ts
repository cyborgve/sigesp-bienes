import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';

@Component({
  selector: 'app-filtro-aprobados',
  templateUrl: './filtro-aprobados.component.html',
  styleUrls: ['./filtro-aprobados.component.scss'],
})
export class FiltroAprobadosComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar = false;
  tiposProceso = TIPOS_PROCESO;
}
