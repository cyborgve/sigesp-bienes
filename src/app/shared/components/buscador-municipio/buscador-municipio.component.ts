import { first, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Municipio } from '@core/models/municipio';
import { TablaEntidad } from '@core/models/tabla-entidad';
import { SigespService } from 'sigesp';
import {
  adaptarMunicipios,
  filtrarValoresIniciales,
  ordenarPorCodigo,
} from '@core/utils/operadores-rxjs';

@Component({
  selector: 'app-buscador-municipio',
  templateUrl: './buscador-municipio.component.html',
  styleUrls: ['./buscador-municipio.component.scss'],
})
export class BuscadorMunicipioComponent
  implements TablaEntidad<Municipio>, AfterViewInit
{
  titulo = 'buscador de municipios';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['MUNICIPIOS'];
  dataSource: MatTableDataSource<Municipio> = new MatTableDataSource();

  constructor(
    private _dialogRef: MatDialogRef<BuscadorMunicipioComponent>,
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._sigesp
      .getMunicipalities()
      .pipe(
        first(),
        adaptarMunicipios(),
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

  seleccionar = (entidad: Municipio) => {
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

  editar(entidad: Municipio): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Municipio): void {
    throw new Error('Method not implemented.');
  }
}
