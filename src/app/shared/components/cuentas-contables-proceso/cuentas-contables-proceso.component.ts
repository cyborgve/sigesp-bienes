import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';

@Component({
  selector: 'app-cuentas-contables-proceso',
  templateUrl: './cuentas-contables-proceso.component.html',
  styleUrls: ['./cuentas-contables-proceso.component.scss'],
})
export class CuentasContablesProcesoComponent {
  @Output() agregarCuentaContable = new EventEmitter();
  @Output() removerCuentaContable = new EventEmitter();
  @Input() dataSource: MatTableDataSource<CuentaContable> =
    new MatTableDataSource();
  @Input() agregarCuentaContableDeshabilitado: boolean = true;

  columnasVisibles = COLUMNAS_VISIBLES.CUENTAS_CONTABLES_PROCESO;
}
