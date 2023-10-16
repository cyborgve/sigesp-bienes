import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inventario-activos',
  templateUrl: './inventario-activos.component.html',
  styleUrls: ['./inventario-activos.component.scss'],
})
export class InventarioActivosComponent {
  titulo = 'Reportes: Inventario de Bienes';
  fechaEmision = new Date();
  formularioRangoFechas: FormGroup;
}
