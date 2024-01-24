import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';

@Component({
  selector: 'app-filtro-metodo-depreciacion',
  templateUrl: './filtro-metodo-depreciacion.component.html',
  styleUrls: ['./filtro-metodo-depreciacion.component.scss'],
})
export class FiltroMetodoDepreciacionComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;
  metodosDepreciacion = METODOS_DEPRECIACION;
}
