import { first, tap } from 'rxjs/operators';
import { TablaEntidad } from '@core/models/tabla-entidad';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Ciudad } from '@core/models/ciudad';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';
import { SigespService } from 'sigesp';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {
  adaptarCiudades,
  filtrarValoresIniciales,
  ordenarPorCodigo,
} from '@core/utils/operadores-rxjs';

@Component({
  selector: 'app-buscador-ciudad',
  templateUrl: './buscador-ciudad.component.html',
  styleUrls: ['./buscador-ciudad.component.scss'],
})
export class BuscadorCiudadComponent
  implements TablaEntidad<Ciudad>, AfterViewInit
{
  titulo = 'buscador de ciudades';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['CIUDADES'];
  dataSource: MatTableDataSource<Ciudad> = new MatTableDataSource();

  constructor(
    private _dialogRef: MatDialogRef<BuscadorCiudadComponent>,
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._sigesp
      .getCity()
      .pipe(
        first(),
        adaptarCiudades(),
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

  seleccionar = (entidad: Ciudad) => {
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

  editar(entidad: Ciudad): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Ciudad): void {
    throw new Error('Method not implemented.');
  }
}
