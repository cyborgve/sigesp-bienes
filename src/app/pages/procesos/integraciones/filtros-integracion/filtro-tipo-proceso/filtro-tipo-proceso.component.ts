import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';

@Component({
  selector: 'app-filtro-tipo-proceso',
  templateUrl: './filtro-tipo-proceso.component.html',
  styleUrls: ['./filtro-tipo-proceso.component.scss'],
})
export class FiltroTipoProcesoComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar = false;
  @Input() tiposProceso = TIPOS_PROCESO;
}
