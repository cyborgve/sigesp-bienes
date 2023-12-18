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
import { Configuracion } from '@core/models/definiciones/configuracion';
import { PlantillaIntegracion } from '@core/models/definiciones/plantilla-integracion';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { PlantillaIntegracionService } from '@core/services/definiciones/plantilla-integracion.service';
import { Id } from '@core/types/id';
import { filtroArranque } from '@core/utils/pipes-rxjs/operadores/filtro-inicial';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { filter, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-plantilla-integracion',
  templateUrl: './tabla-plantilla-integracion.component.html',
  styleUrls: ['./tabla-plantilla-integracion.component.scss'],
})
export class TablaPlantillaIntegracionComponent
  implements TablaEntidad<PlantillaIntegracion>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] =
    COLUMNAS_VISIBLES.PLANTILLAS_INTEGRACION;
  @Input() filtros = [filtroArranque()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/plantillas-integracion';
  private urlSingular = this.urlPlural + '/plantilla-integracion';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/plantilla-integracion/' + id;

  dataSource: MatTableDataSource<PlantillaIntegracion> =
    new MatTableDataSource();
  activarPaginacion: boolean = false;
  opcionesPaginacion: number[] = [6];
  mostrarBotonesInicioFinal: boolean = true;
  mostrarOpcionesPaginacion: boolean = true;
  itemsPorPagina = 6;

  constructor(
    private _entidad: PlantillaIntegracionService,
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
            tap((entidades: PlantillaIntegracion[]) => {
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

  editar(entidad: PlantillaIntegracion) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: PlantillaIntegracion) {
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
        switchMap(() =>
          this._entidad.eliminar(entidad.id, 'PLANTILLA DE INTEGRACION')
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
