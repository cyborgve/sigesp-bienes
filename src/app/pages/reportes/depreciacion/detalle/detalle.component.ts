import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Depreciacion } from '@core/models/procesos/depreciacion';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
  @Input() columnasVisibles = [
    'comprobante',
    'activo',
    'identificador',
    'metodo',
    'creado',
  ];
  @Input() dataSource: MatTableDataSource<Depreciacion> =
    new MatTableDataSource();
}
