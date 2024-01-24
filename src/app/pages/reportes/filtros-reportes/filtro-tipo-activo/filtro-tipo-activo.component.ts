import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { TIPOS_ACTIVO } from '@core/constants/tipos_activo';

@Component({
  selector: 'app-filtro-tipo-activo',
  templateUrl: './filtro-tipo-activo.component.html',
  styleUrls: ['./filtro-tipo-activo.component.scss'],
})
export class FiltroTipoActivoComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar = false;
  tiposActivo = TIPOS_ACTIVO;
}
