import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { FuenteFinanciamiento } from '@core/models/otros-modulos/fuente-financiamiento';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { first, tap, map, switchMap, take } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { adaptarFuentesFinanciamiento } from '@core/utils/pipes-rxjs/adaptadores/adaptar-fuente-financiamiento';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';
import { pipe } from 'rxjs';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { FuenteFinanciamientoService } from '@core/services/otros-modulos/fuente-financiamiento.service';
import { Configuracion } from '@core/models/definiciones/configuracion';

const filtroInicial = () =>
  pipe(map((fuentes: FuenteFinanciamiento[]) => fuentes));

@Component({
  selector: 'app-buscador-fuente-financiamiento',
  templateUrl: './buscador-fuente-financiamiento.component.html',
  styleUrls: ['./buscador-fuente-financiamiento.component.scss'],
})
export class BuscadorFuenteFinanciamientoComponent
  implements TablaEntidad<FuenteFinanciamiento>, AfterViewInit
{
  titulo = 'buscador de fuentes de financiamiento';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() filtros = [filtroInicial()];
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['FUENTES_FINANCIEMIENTO'];
  dataSource: MatTableDataSource<FuenteFinanciamiento> =
    new MatTableDataSource();
  activarPaginacion: boolean = false;
  opcionesPaginacion: number[] = [6];
  mostrarBotonesInicioFinal: boolean = true;
  mostrarOpcionesPaginacion: boolean = true;
  itemsPorPagina = 6;

  constructor(
    private _dialogRef: MatDialogRef<BuscadorFuenteFinanciamientoComponent>,
    private _entidad: FuenteFinanciamientoService,
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
            tap((entidades: FuenteFinanciamiento[]) => {
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

  seleccionar = (entidad: FuenteFinanciamiento) => {
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

  editar(entidad: FuenteFinanciamiento): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: FuenteFinanciamiento): void {
    throw new Error('Method not implemented.');
  }
}
