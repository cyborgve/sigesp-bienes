import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CuentaContable } from '@core/models/otros-modulos/cuenta-contable';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { first, tap, map, take, switchMap } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';
import { pipe } from 'rxjs';
import { adaptarCuentasContables } from '@core/utils/pipes-rxjs/adaptadores/adaptar-cuenta-contable';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { CuentaContableService } from '@core/services/otros-modulos/cuenta-contable.service';

const filtroInicial = () => pipe(map((cuentas: CuentaContable[]) => cuentas));

@Component({
  selector: 'app-buscador-cuenta-contable',
  templateUrl: './buscador-cuenta-contable.component.html',
  styleUrls: ['./buscador-cuenta-contable.component.scss'],
})
export class BuscadorCuentaContableComponent
  implements TablaEntidad<CuentaContable>, AfterViewInit
{
  titulo = 'buscador de cuentas contables';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() filtros = [filtroInicial()];
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.CUENTAS_CONTABLES;
  dataSource: MatTableDataSource<CuentaContable> = new MatTableDataSource();
  activarPaginacion: boolean = false;
  opcionesPaginacion: number[] = [6];
  mostrarBotonesInicioFinal: boolean = true;
  mostrarOpcionesPaginacion: boolean = true;
  itemsPorPagina = 6;

  constructor(
    private _dialogRef: MatDialogRef<BuscadorCuentaContableComponent>,
    private _entidad: CuentaContableService,
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
            tap((entidades: CuentaContable[]) => {
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
