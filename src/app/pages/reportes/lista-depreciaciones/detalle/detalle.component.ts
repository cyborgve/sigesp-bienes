import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { DepreciacionLista } from '@core/models/auxiliares/depreciacion-lista';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleComponent {
  @Input() columnasVisibles = [
    'comprobante',
    'activo',
    'identificador',
    'costo',
    'metodo',
    'creado',
  ];
  @Input() dataSource: MatTableDataSource<DepreciacionLista> =
    new MatTableDataSource();
}
