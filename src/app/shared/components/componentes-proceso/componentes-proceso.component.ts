import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Componente } from '@core/models/definiciones/componente';

@Component({
  selector: 'app-componentes-proceso',
  templateUrl: './componentes-proceso.component.html',
  styleUrls: ['./componentes-proceso.component.scss'],
})
export class ComponentesProcesoComponent {
  @Output() agregarComponente = new EventEmitter();
  @Output() removerComponente = new EventEmitter();
  @Input() dataSource: MatTableDataSource<Componente> =
    new MatTableDataSource();

  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES;
}
