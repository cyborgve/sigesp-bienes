import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CuentaContable } from '@core/models/cuenta-contable';
import { TablaEntidad } from '@core/models/tabla-entidad';
import { adaptarCuentasContables } from '@core/utils/operadores-rxjs';
import { first, map, tap } from 'rxjs/operators';
import { SigespService } from 'sigesp';

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
        first(),
        adaptarCuentasContables(),
        tap(cuentas => {
          this.dataSource = new MatTableDataSource(cuentas);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        })
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
