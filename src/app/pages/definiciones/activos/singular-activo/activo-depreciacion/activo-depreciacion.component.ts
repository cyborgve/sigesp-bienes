import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-activo-depreciacion',
  templateUrl: './activo-depreciacion.component.html',
  styleUrls: ['./activo-depreciacion.component.scss'],
})
export class ActivoDepreciacionComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  metodosDepreciacion: string[] = [
    'Método de depreciación 1',
    'Método de depreciación 2',
    'Método de depreciación 3',
    'Método de depreciación 4',
  ];

  buscarCuentaContableGasto() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }

  buscarCuentaContableDepreciacion() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }
}
