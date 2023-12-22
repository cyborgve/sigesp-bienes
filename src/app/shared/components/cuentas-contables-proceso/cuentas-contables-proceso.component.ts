import { Component, Output, Input, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CuentaContableProceso } from '@core/models/auxiliares/cuenta-contable-proceso';

@Component({
  selector: 'app-cuentas-contables-proceso',
  templateUrl: './cuentas-contables-proceso.component.html',
  styleUrls: ['./cuentas-contables-proceso.component.scss'],
})
export class CuentasContablesProcesoComponent {
  @Output() agregarCuentaContable = new EventEmitter();
  @Output() removerCuentaContable = new EventEmitter();
  @Input() dataSource: MatTableDataSource<CuentaContableProceso> =
    new MatTableDataSource();
  @Input() agregarCuentaContableDeshabilitado: boolean = true;
  @Input() agregarCuentaContableVisible: boolean = true;

  columnasVisibles = COLUMNAS_VISIBLES.CUENTAS_CONTABLES_PROCESO;
}
