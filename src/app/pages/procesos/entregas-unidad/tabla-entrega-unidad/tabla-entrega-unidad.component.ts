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
import { EntregaUnidad } from '@core/models/procesos/entrega-unidad';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { EntregaUnidadService } from '@core/services/procesos/entrega-unidad.service';
import { Id } from '@core/types/id';
import { abrirReporteProceso } from '@core/utils/funciones/abrir-reporte-proceso';
import { ordenarPorComprobanteDescendente } from '@core/utils/operadores-rxjs/ordenar-por-comprobante-descendente';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { DialogoEliminarProcesoComponent } from '@shared/components/dialogo-eliminar-proceso/dialogo-eliminar-proceso.component';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-entrega-unidad',
  templateUrl: './tabla-entrega-unidad.component.html',
  styleUrls: ['./tabla-entrega-unidad.component.scss'],
})
export class TablaEntregaUnidadComponent
  implements TablaEntidad<EntregaUnidad>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.ENTREGA_UNIDAD;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/procesos/entregas-unidad';
  private urlSingular = this.urlPlural + '/entrega-unidad';
  private urlSingularId = (id: Id) => this.urlPlural + '/entrega-unidad/' + id;
  dataSource: MatTableDataSource<EntregaUnidad> = new MatTableDataSource();

  constructor(
    private _entidad: EntregaUnidadService,
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

  filtrar(event: Event) {
    let valorFiltro = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  nuevo() {
    this._router.navigate([this.urlSingular]);
  }

  editar(entidad: EntregaUnidad) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }
  imprimir(entidad: EntregaUnidad) {
    this._entidad
      .buscarPorId(entidad.id)
      .pipe(abrirReporteProceso(this._pdf, 'ENTREGA DE UNIDAD'), take(1))
      .subscribe();
  }

  eliminar(entidad: EntregaUnidad) {
    let dialog = this._dialog.open(DialogoEliminarProcesoComponent, {
      data: {
        comprobante: entidad.comprobante,
        tipoProceso: 'ENTREGA DE UNIDAD',
      },
      width: '35%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() =>
          this._entidad.eliminar(entidad.id, 'ENTREGA DE UNIDAD')
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
