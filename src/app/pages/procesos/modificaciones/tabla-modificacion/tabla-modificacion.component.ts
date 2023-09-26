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
import { Modificacion } from '@core/models/procesos/modificacion';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { ModificacionService } from '@core/services/procesos/modificacion.service';
import { Id } from '@core/types/id';
import { abrirReporteProceso } from '@core/utils/funciones/abrir-reporte-proceso';
import { ordenarPorComprobanteDescendente } from '@core/utils/operadores-rxjs/ordenar-por-comprobante-descendente';
import { DialogoEliminarProcesoComponent } from '@shared/components/dialogo-eliminar-proceso/dialogo-eliminar-proceso.component';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-modificacion',
  templateUrl: './tabla-modificacion.component.html',
  styleUrls: ['./tabla-modificacion.component.scss'],
})
export class TablaModificacionComponent
  implements TablaEntidad<Modificacion>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.MODIFICACIONES;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/procesos/modificaciones';
  private urlSingular = this.urlPlural + '/modificacion';
  private urlSingularId = (id: Id) => this.urlPlural + '/modificacion/' + id;
  dataSource: MatTableDataSource<Modificacion> = new MatTableDataSource();

  constructor(
    private _entidad: ModificacionService,
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
        first()
      )
      .subscribe();
  }

  irAtras() {
    this._location.back();
  }

  irAlInicio() {
    this._router.navigate(['/']);
  }
  imprimir(entidad: Modificacion) {
    this._entidad
      .buscarPorId(entidad.id)
      .pipe(abrirReporteProceso(this._pdf, 'MODIFICACIÓN'), take(1))
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

  editar(entidad: Modificacion) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Modificacion) {
    let dialog = this._dialog.open(DialogoEliminarProcesoComponent, {
      data: {
        comprobante: entidad.comprobante,
        tipoProceso: 'MODIFICACIÓN',
      },
      width: '35%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() => this._entidad.eliminar(entidad.id, 'MODIFICACIÓN')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
