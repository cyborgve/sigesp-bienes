import { tap, take, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { UnidadOrganizativa } from '@core/models/otros-modulos/unidad-organizativa';
import { UnidadOrganizativaService } from '@core/services/otros-modulos/unidad-organizativa.service';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { Configuracion } from '@core/models/definiciones/configuracion';

@Component({
  selector: 'app-buscador-unidad-organizativa',
  templateUrl: './buscador-unidad-organizativa.component.html',
  styleUrls: ['./buscador-unidad-organizativa.component.scss'],
})
export class BuscadorUnidadOrganizativaComponent
  implements TablaEntidad<UnidadOrganizativa>, AfterViewInit
{
  titulo = 'buscador de unidades organizativas';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = ['codigo', 'denominacion', 'creado', 'modificado'];
  dataSource: MatTableDataSource<UnidadOrganizativa> = new MatTableDataSource();
  activarPaginacion: boolean = false;
  opcionesPaginacion: number[] = [6];
  mostrarBotonesInicioFinal: boolean = true;
  mostrarOpcionesPaginacion: boolean = true;
  itemsPorPagina = 6;

  constructor(
    private _dialogRef: MatDialogRef<BuscadorUnidadOrganizativaComponent>,
    private _entidad: UnidadOrganizativaService,
    private _location: Location,
    private _router: Router,
    private _configuracion: ConfiguracionService
  ) {}

  ngAfterViewInit(): void {
    this._configuracion
      .buscarPorId(1)
      .pipe(
        tap(configuracion => this.ajustarConfiguracion(configuracion)),
        take(1)
      )
      .subscribe();
    this.recargarDatos();
  }

  private ajustarConfiguracion(configuracion: Configuracion) {
    this.activarPaginacion =
      configuracion.activarPaginacion === 1 ? true : false;
    this.opcionesPaginacion = configuracion.opcionesPaginacion;
    this.mostrarBotonesInicioFinal =
      configuracion.mostrarBotonesInicioFinal === 1 ? true : false;
    this.mostrarOpcionesPaginacion =
      configuracion.mostrarOpcionesPaginacion === 1 ? true : false;
    this.itemsPorPagina = configuracion.opcionesPaginacion[0];
  }

  private recargarDatos() {
    this._configuracion
      .buscarPorId(1)
      .pipe(
        switchMap(configuracion =>
          this._entidad.buscarTodos().pipe(
            ordenarPorCodigo(),
            tap((entidades: UnidadOrganizativa[]) => {
              this.dataSource = new MatTableDataSource(entidades);
              this.dataSource.sort = this.sort;
              if (configuracion.activarPaginacion) {
                this.ajustarConfiguracion(configuracion);
                this.dataSource.paginator = this.paginator;
              }
            })
          )
        ),
        take(1)
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
