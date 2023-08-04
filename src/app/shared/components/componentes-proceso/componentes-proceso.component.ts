import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-componentes-proceso',
  templateUrl: './componentes-proceso.component.html',
  styleUrls: ['./componentes-proceso.component.scss'],
})
export class ComponentesProcesoComponent {
  @Output() agregarComponente = new EventEmitter();
  @Output() removerComponente = new EventEmitter();
  @Input() dataSource: MatTableDataSource<ActivoComponente> =
    new MatTableDataSource();

  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES;
}
