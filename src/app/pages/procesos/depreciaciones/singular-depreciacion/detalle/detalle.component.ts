import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { DepreciacionDetalle } from '@core/models/procesos/depreciacion';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
  @Input() dataSource: MatTableDataSource<DepreciacionDetalle>;
  columnasVisibles = COLUMNAS_VISIBLES.DEPRECIACIONES_DETALLE;
  titulo = 'Detalle de la depreciación';
}
