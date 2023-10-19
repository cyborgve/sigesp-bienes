import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';

@Component({
  selector: 'app-filtro-metodo-depreciacion',
  templateUrl: './filtro-metodo-depreciacion.component.html',
  styleUrls: ['./filtro-metodo-depreciacion.component.scss'],
})
export class FiltroMetodoDepreciacionComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;
  metodosDepreciacion = METODOS_DEPRECIACION;
}
