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
import { CambioResponsable } from '@core/models/procesos/cambio-responsable';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { CambioResponsableService } from '@core/services/procesos/cambio-responsable.service';
import { Id } from '@core/types/id';
import { abrirReporteProceso } from '@core/utils/funciones/abrir-reporte-proceso';
import { ordenarPorComprobanteDescendente } from '@core/utils/operadores-rxjs/ordenar-por-comprobante-descendente';
import { DialogoEliminarProcesoComponent } from '@shared/components/dialogo-eliminar-proceso/dialogo-eliminar-proceso.component';
import { filter, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-cambio-responsable',
  templateUrl: './tabla-cambio-responsable.component.html',
  styleUrls: ['./tabla-cambio-responsable.component.scss'],
})
export class TablaCambioResponsableComponent
  implements TablaEntidad<CambioResponsable>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.CAMBIOS_RESPONSABLE;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/procesos/cambios-responsable';
  private urlSingular = this.urlPlural + '/cambio-responsable';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/cambio-responsable/' + id;
  dataSource: MatTableDataSource<CambioResponsable> = new MatTableDataSource();

  constructor(
    private _entidad: CambioResponsableService,
    private _location: Location,
    private _router: Router,
    private _dialog: MatDialog,
    private _pdf: PDFService
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._entidad
      .buscarTodos()
      .pipe(
        ordenarPorComprobanteDescendente(),
        tap(entidades => {
          this.dataSource = new MatTableDataSource(entidades);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }),
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
  imprimir(entidad: CambioResponsable) {
    this._entidad
      .buscarPorId(entidad.id)
      .pipe(abrirReporteProceso(this._pdf, 'CAMBIO DE RESPONSABLE'), take(1))
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

  editar(entidad: CambioResponsable) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: CambioResponsable) {
    let dialog = this._dialog.open(DialogoEliminarProcesoComponent, {
      data: {
        comprobante: entidad.comprobante,
        tipoProceso: 'CAMBIO DE RESPONSABLE',
      },
      width: '40%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() =>
          this._entidad.eliminar(entidad.id, 'CAMBIO DE RESPONSABLE')
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
