import { tap, filter, switchMap, take } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Aseguradora } from '@core/models/definiciones/aseguradora';
import { MatTableDataSource } from '@angular/material/table';
import { AseguradoraService } from '@core/services/definiciones/aseguradora.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Id } from '@core/types/id';
import { MatDialog } from '@angular/material/dialog';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { filtroArranque } from '@core/utils/pipes-rxjs/operadores/filtro-inicial';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { Configuracion } from '@core/models/definiciones/configuracion';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';

@Component({
  selector: 'app-tabla-aseguradora',
  templateUrl: './tabla-aseguradora.component.html',
  styleUrls: ['./tabla-aseguradora.component.scss'],
})
export class TablaAseguradoraComponent
  implements TablaEntidad<Aseguradora>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.ASEGURADORAS;
  @Input() filtros = [filtroArranque()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/aseguradoras';
  private urlSingular = this.urlPlural + '/aseguradora';
  private urlSingularId = (id: Id) => this.urlPlural + '/aseguradora/' + id;

  dataSource: MatTableDataSource<Aseguradora> = new MatTableDataSource();
  activarPaginacion: boolean = false;
  opcionesPaginacion: number[] = [6];
  mostrarBotonesInicioFinal: boolean = true;
  mostrarOpcionesPaginacion: boolean = true;
  itemsPorPagina = 6;

  constructor(
    private _entidad: AseguradoraService,
    private _location: Location,
    private _router: Router,
    private _dialog: MatDialog,
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
            tap((entidades: Aseguradora[]) => {
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

  filtrar(event: Event) {
    let valorFiltro = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  nuevo() {
    this._router.navigate([this.urlSingular]);
  }

  editar(entidad: Aseguradora) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Aseguradora) {
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
      data: {
        codigo: entidad.codigo,
        denominacion: entidad.denominacion,
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() => this._entidad.eliminar(entidad.id, 'ASEGURADORA')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
