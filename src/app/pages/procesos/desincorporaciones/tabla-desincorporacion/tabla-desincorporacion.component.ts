import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { Desincorporacion } from '@core/models/procesos/desincorporacion';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { DesincorporacionService } from '@core/services/procesos/desincorporacion.service';
import { Id } from '@core/types/id';
import { abrirReporteProceso } from '@core/utils/pipes-rxjs/procesos/abrir-reporte-proceso';
import { ordenarPorComprobanteDescendente } from '@core/utils/pipes-rxjs/operadores/ordenar-por-comprobante-descendente';
import { DialogoEliminarProcesoComponent } from '@shared/components/dialogo-eliminar-proceso/dialogo-eliminar-proceso.component';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { Configuracion } from '@core/models/definiciones/configuracion';

@Component({
  selector: 'app-tabla-desincorporacion',
  templateUrl: './tabla-desincorporacion.component.html',
  styleUrls: ['./tabla-desincorporacion.component.scss'],
})
export class TablaDesincorporacionComponent
  implements TablaEntidad<Desincorporacion>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.DESINCORPORACIONES;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/procesos/desincorporaciones';
  private urlSingular = this.urlPlural + '/desincorporacion';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/desincorporacion/' + id;

  dataSource: MatTableDataSource<Desincorporacion> = new MatTableDataSource();
  activarPaginacion: boolean = false;
  opcionesPaginacion: number[] = [6];
  mostrarBotonesInicioFinal: boolean = true;
  mostrarOpcionesPaginacion: boolean = true;
  itemsPorPagina = 6;

  constructor(
    private _entidad: DesincorporacionService,
    private _location: Location,
    private _router: Router,
    private _dialog: MatDialog,
    private _pdf: PDFService,
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
            ordenarPorComprobanteDescendente(),
            tap((entidades: Desincorporacion[]) => {
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

  irAtras() {
    this._location.back();
  }

  irAlInicio() {
    this._router.navigate(['/']);
  }

  imprimir(entidad: Desincorporacion) {
    this._entidad
      .buscarPorId(entidad.id)
      .pipe(abrirReporteProceso(this._pdf, 'DESINCORPORACIÓN'), take(1))
      .subscribe();
  }

  filtrar(event: Event) {
    let valorFiltro = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  nuevo() {
    this._router.navigate([this.urlSingular]);
  }

  editar(entidad: Desincorporacion) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Desincorporacion) {
    let dialog = this._dialog.open(DialogoEliminarProcesoComponent, {
      data: {
        comprobante: entidad.comprobante,
        tipoProceso: 'DESINCORPORACIÓN',
      },
      width: '35%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() => this._entidad.eliminar(entidad.id, 'DESINCORPORACIÓN')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
