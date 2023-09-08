import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { first, tap, map } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { adaptarCuentasContables } from '@core/utils/adaptadores-rxjs/adaptar-cuentas-contables';
import { filtrarValoresIniciales } from '@core/utils/operadores-rxjs/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/operadores-rxjs/ordenar-por-codigo';
import { pipe } from 'rxjs';

const filtroInicial = () => pipe(map((cuentas: CuentaContable[]) => cuentas));

@Component({
  selector: 'app-buscador-cuenta-contable',
  templateUrl: './buscador-cuenta-contable.component.html',
  styleUrls: ['./buscador-cuenta-contable.component.scss'],
})
export class BuscadorCuentaContableComponent
  implements TablaEntidad<CuentaContable>, AfterViewInit
{
  titulo = 'buscador de cuentas contables';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CUENTAS_CONTABLES;
  dataSource: MatTableDataSource<CuentaContable> = new MatTableDataSource();
  @Input() filtros = [filtroInicial()];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorCuentaContableComponent>,
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._sigesp
      .getCuentasInstitucionales()
      .pipe(
        adaptarCuentasContables(),
        filtrarValoresIniciales(),
        ordenarPorCodigo(),
        pipeFromArray(this.filtros),
        tap(cuentas => {
          this.dataSource = new MatTableDataSource(cuentas);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        }),
        first()
      )
      .subscribe();
  }

  seleccionar = (entidad: CuentaContable) => {
    this._dialogRef.close(entidad);
  };

  irAtras(): void {
    this._location.back();
  }

  irAlInicio(): void {
    this._router.navigate(['/definitions']);
  }

  filtrar(event: Event): void {
    let valorFiltro = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  nuevo(): void {
    throw new Error('Method not implemented.');
  }

  editar(entidad: CuentaContable): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: CuentaContable): void {
    throw new Error('Method not implemented.');
  }
}
