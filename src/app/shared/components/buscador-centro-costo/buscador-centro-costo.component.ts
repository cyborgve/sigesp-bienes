import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { first, tap, map, take, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CentroCostos } from '@core/models/otros-modulos/centro-costos';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { SigespService } from 'sigesp';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';
import { pipe } from 'rxjs';
import { adaptarCentrosCostos } from '@core/utils/pipes-rxjs/adaptadores/adaptar-centro-costo';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { CentroCostosService } from '@core/services/otros-modulos/centro-costos.service';

const filtroInicial = () => pipe(map((centros: CentroCostos[]) => centros));

@Component({
  selector: 'app-buscador-centro-costo',
  templateUrl: './buscador-centro-costo.component.html',
  styleUrls: ['./buscador-centro-costo.component.scss'],
})
export class BuscadorCentroCostoComponent
  implements TablaEntidad<CentroCostos>, AfterViewInit
{
  titulo = 'buscador de centros de costo';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() filtros = [filtroInicial()];
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['CENTROS_COSTO'];
  dataSource: MatTableDataSource<CentroCostos> = new MatTableDataSource();
  activarPaginacion: boolean = false;
  opcionesPaginacion: number[] = [6];
  mostrarBotonesInicioFinal: boolean = true;
  mostrarOpcionesPaginacion: boolean = true;
  itemsPorPagina = 6;

  constructor(
    private _dialogRef: MatDialogRef<BuscadorCentroCostoComponent>,
    private _entidad: CentroCostosService,
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
            pipeFromArray(this.filtros),
            tap((entidades: CentroCostos[]) => {
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

  seleccionar = (entidad: CentroCostos) => {
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

  editar(entidad: CentroCostos): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: CentroCostos): void {
    throw new Error('Method not implemented.');
  }
}
