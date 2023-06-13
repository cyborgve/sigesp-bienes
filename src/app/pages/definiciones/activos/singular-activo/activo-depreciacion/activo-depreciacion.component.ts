import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { METODOS_DEPRECIACION } from '@core/constants/metodos-depreciacion';

@Component({
  selector: 'app-activo-depreciacion',
  templateUrl: './activo-depreciacion.component.html',
  styleUrls: ['./activo-depreciacion.component.scss'],
})
export class ActivoDepreciacionComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  metodosDepreciacion = METODOS_DEPRECIACION;

  buscarCuentaContableGasto() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }

  buscarCuentaContableDepreciacion() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }

  buscarPlantillaDepreciacion() {}
}
