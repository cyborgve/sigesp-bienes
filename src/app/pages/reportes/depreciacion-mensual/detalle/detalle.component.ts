import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
  @Input() dataSource: MatTableDataSource<DetalleDepreciacion> =
    new MatTableDataSource();
  columnasVisibles = [
    'fechaDepreciacion',
    'comprobante',
    'activo',
    'identificador',
    'depreciacionMensual',
    'depreciacionAcumulada',
    'valorContable',
  ];
}
