import { first, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Pais } from '@core/models/pais';
import { TablaEntidad } from '@core/models/tabla-entidad';
import { SigespService } from 'sigesp';
import {
  adaptarPaises,
  filtrarValoresIniciales,
  ordenarPorCodigo,
} from '@core/utils/operadores-rxjs';

@Component({
  selector: 'app-buscador-pais',
  templateUrl: './buscador-pais.component.html',
  styleUrls: ['./buscador-pais.component.scss'],
})
export class BuscadorPaisComponent
  implements TablaEntidad<Pais>, AfterViewInit
{
  titulo = 'buscador de paises';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['PAISES'];
  dataSource: MatTableDataSource<Pais> = new MatTableDataSource();

  constructor(
    private _dialogRef: MatDialogRef<BuscadorPaisComponent>,
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._sigesp
      .getCountries()
      .pipe(
        first(),
        adaptarPaises(),
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

  seleccionar = (entidad: Pais) => {
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

  editar(entidad: Pais): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Pais): void {
    throw new Error('Method not implemented.');
  }
}
