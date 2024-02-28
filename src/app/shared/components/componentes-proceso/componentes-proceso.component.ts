import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ComponenteProceso } from '@core/models/auxiliares/componente-proceso';

@Component({
  selector: 'app-componentes-proceso',
  templateUrl: './componentes-proceso.component.html',
  styleUrls: ['./componentes-proceso.component.scss'],
})
export class ComponentesProcesoComponent {
  @Output() agregarComponente = new EventEmitter();
  @Output() removerComponente = new EventEmitter();
  @Input() agregarComponentesDeshabilitado: boolean = true;
  @Input() dataSource: MatTableDataSource<ComponenteProceso> =
    new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES;
}
