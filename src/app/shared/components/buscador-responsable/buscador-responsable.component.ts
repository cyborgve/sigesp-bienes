import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { tap, map, take, switchMap } from 'rxjs/operators';
import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { Location } from '@angular/common';
import { pipe } from 'rxjs';
import { ResponsableService } from '@core/services/otros-modulos/responsable.service';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { Configuracion } from '@core/models/definiciones/configuracion';

const filtroInicial = () =>
  pipe(map((responsables: Responsable[]) => responsables));

@Component({
  selector: 'app-buscador-responsable',
  templateUrl: './buscador-responsable.component.html',
  styleUrls: ['./buscador-responsable.component.scss'],
})
export class BuscadorResponsableComponent
  implements TablaEntidad<Responsable>, AfterViewInit
{
  titulo = 'buscador de Responsables';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() filtros = [filtroInicial()];
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['RESPONSABLES'];
  dataSource: MatTableDataSource<Responsable> = new MatTableDataSource();
  activarPaginacion: boolean = false;
  opcionesPaginacion: number[] = [6];
  mostrarBotonesInicioFinal: boolean = true;
  mostrarOpcionesPaginacion: boolean = true;
  itemsPorPagina = 6;

  constructor(
    private _dialogRef: MatDialogRef<BuscadorResponsableComponent>,
    private _location: Location,
    private _router: Router,
    private _entidad: ResponsableService,
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
            pipeFromArray(this.filtros),
            tap((entidades: Responsable[]) => {
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

  seleccionar = (entidad: Responsable) => {
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

  editar(entidad: Responsable): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Responsable): void {
    throw new Error('Method not implemented.');
  }
}
