import { first, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { UnidadOrganizativa } from '@core/models/otros-modulos/unidad-organizativa';
import { UnidadOrganizativaService } from '@core/services/otros-modulos/unidad-organizativa.service';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';

@Component({
  selector: 'app-buscador-unidad-organizativa',
  templateUrl: './buscador-unidad-organizativa.component.html',
  styleUrls: ['./buscador-unidad-organizativa.component.scss'],
})
export class BuscadorUnidadOrganizativaComponent
  implements TablaEntidad<UnidadOrganizativa>, AfterViewInit
{
  titulo = 'buscador de unidades organizativas';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = ['codigo', 'denominacion', 'creado', 'modificado'];
  dataSource: MatTableDataSource<UnidadOrganizativa> = new MatTableDataSource();

  constructor(
    private _dialogRef: MatDialogRef<BuscadorUnidadOrganizativaComponent>,
    private _unidadOrganizativa: UnidadOrganizativaService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._unidadOrganizativa
      .buscarTodos()
      .pipe(
        first(),
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

  seleccionar = (entidad: UnidadOrganizativa) => {
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

  editar(entidad: UnidadOrganizativa): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: UnidadOrganizativa): void {
    throw new Error('Method not implemented.');
  }
}
