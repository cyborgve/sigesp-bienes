import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Activo } from '@core/models/definiciones/activo';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
  @Input() dataSource: MatTableDataSource<Activo> = new MatTableDataSource();
  columnasVisibles = [
    'codigo',
    'denominacion',
    'serialRotulacion',
    'tipoActivo',
    'creado',
    'modificado',
  ];
}
