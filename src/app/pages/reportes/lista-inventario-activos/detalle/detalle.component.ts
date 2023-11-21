import { MatTableDataSource } from '@angular/material/table';
import { Component, Input } from '@angular/core';
import { ActivoListaInventario } from '@core/models/auxiliares/activo-lista-inventario';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
  @Input() dataSource: MatTableDataSource<ActivoListaInventario> =
    new MatTableDataSource();
  columnasVisibles = [
    'codigo',
    'tipo',
    'denominacion',
    //'identificador',
    'marcaModelo',
    //'serial',
    'precio',
    //'estado',
    //'condicion',
    'creado',
    'modificado',
  ];

  constructor() {}
}
