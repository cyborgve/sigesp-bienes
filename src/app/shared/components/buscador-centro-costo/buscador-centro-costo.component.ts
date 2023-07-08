import { first, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CentroCosto } from '@core/models/otros-modulos/centro-costo';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { SigespService } from 'sigesp';
import {
  adaptarCentrosCosto,
  filtrarValoresIniciales,
  ordenarPorCodigo,
} from '@core/utils/operadores-rxjs';

@Component({
  selector: 'app-buscador-centro-costo',
  templateUrl: './buscador-centro-costo.component.html',
  styleUrls: ['./buscador-centro-costo.component.scss'],
})
export class BuscadorCentroCostoComponent
  implements TablaEntidad<CentroCosto>, AfterViewInit
{
  titulo = 'buscador de centros de costo';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['CENTROS_COSTO'];
  dataSource: MatTableDataSource<CentroCosto> = new MatTableDataSource();

  constructor(
    private _dialogRef: MatDialogRef<BuscadorCentroCostoComponent>,
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._sigesp
      .getCentroCosto()
      .pipe(
        first(),
        adaptarCentrosCosto(),
        filtrarValoresIniciales(),
        ordenarPorCodigo(),
        tap(cuentas => {
          this.dataSource = new MatTableDataSource(cuentas);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        })
      )
      .subscribe();
  }

  seleccionar = (entidad: CentroCosto) => {
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

  editar(entidad: CentroCosto): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: CentroCosto): void {
    throw new Error('Method not implemented.');
  }
}
