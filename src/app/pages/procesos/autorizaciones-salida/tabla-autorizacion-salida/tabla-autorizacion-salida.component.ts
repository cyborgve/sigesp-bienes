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
import { AutorizacionSalida } from '@core/models/procesos/autorizacion-salida';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { AutorizacionSalidaService } from '@core/services/procesos/autorizacion-salida.service';
import { Id } from '@core/types/id';
import { DialogoEliminarProcesoComponent } from '@shared/components/dialogo-eliminar-proceso/dialogo-eliminar-proceso.component';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { ordenarPorComprobanteDescendente } from '@core/utils/operadores-rxjs/ordenar-por-comprobante-descendente';
import { abrirReporteProceso } from '@core/utils/funciones/abrir-reporte-proceso';

@Component({
  selector: 'app-tabla-autorizacion-salida',
  templateUrl: './tabla-autorizacion-salida.component.html',
  styleUrls: ['./tabla-autorizacion-salida.component.scss'],
})
export class TablaAutorizacionSalidaComponent
  implements TablaEntidad<AutorizacionSalida>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.AUTORIZACIONES_SALIDA;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/procesos/autorizaciones-salida';
  private urlSingular = this.urlPlural + '/autorizacion-salida';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/autorizacion-salida/' + id;
  dataSource: MatTableDataSource<AutorizacionSalida> = new MatTableDataSource();

  constructor(
    private _entidad: AutorizacionSalidaService,
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

  imprimir(entidad: AutorizacionSalida) {
    this._entidad
      .buscarPorId(entidad.id)
      .pipe(abrirReporteProceso(this._pdf, 'AUTORIZACIÓN DE SALIDA'), take(1))
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

  editar(entidad: AutorizacionSalida) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: AutorizacionSalida) {
    let dialog = this._dialog.open(DialogoEliminarProcesoComponent, {
      data: {
        comprobante: entidad.comprobante,
        tipoProceso: 'AUTORIZACION DE SALIDA',
      },
      width: '40%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() =>
          this._entidad.eliminar(entidad.id, 'AUTORIZACION DE SALIDA')
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
