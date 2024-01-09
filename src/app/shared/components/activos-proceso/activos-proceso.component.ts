import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { MatTableDataSource } from '@angular/material/table';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Activo } from '@core/models/definiciones/activo';
import { ActivoListaRetorno } from '@core/models/auxiliares/activo-lista-retorno';

@Component({
  selector: 'app-activos-proceso',
  templateUrl: './activos-proceso.component.html',
  styleUrls: ['./activos-proceso.component.scss'],
})
export class ActivosProcesoComponent {
  @Output() agregarActivo = new EventEmitter();
  @Output() removerActivo = new EventEmitter();
  @Input() dataSource: MatTableDataSource<Activo | ActivoListaRetorno> =
    new MatTableDataSource();
  @Input() agregarActivoDeshabilitado: boolean = true;
  @Input() ocultarAgregarActivo: boolean = true;
  @Input() ocultarEncabezado: boolean = true;
  @Input() columnasVisibles = COLUMNAS_VISIBLES.ACTIVOS;
}
