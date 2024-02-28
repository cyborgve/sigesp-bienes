import { Component, Input } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
  @Input() dataSource: MatTableDataSource<DetalleDepreciacion>;
  @Input() monedaIso: string = 'VES';
  columnasVisibles = COLUMNAS_VISIBLES.DEPRECIACIONES_DETALLE;
  titulo = 'Detalle de la depreciación';
}
