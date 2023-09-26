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
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { Id } from '@core/types/id';
import { abrirReporteProceso } from '@core/utils/funciones/abrir-reporte-proceso';
import { ordenarPorComprobanteDescendente } from '@core/utils/operadores-rxjs/ordenar-por-comprobante-descendente';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-depreciacion',
  templateUrl: './tabla-depreciacion.component.html',
  styleUrls: ['./tabla-depreciacion.component.scss'],
})
export class TablaDepreciacionComponent
  implements TablaEntidad<Depreciacion>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.DEPRECIACIONES;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/procesos/depreciaciones';
  private urlSingular = this.urlPlural + '/depreciacion';
  private urlSingularId = (id: Id) => this.urlPlural + '/depreciacion/' + id;
  dataSource: MatTableDataSource<Depreciacion> = new MatTableDataSource();

  constructor(
    private _entidad: DepreciacionService,
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

  editar(entidad: Depreciacion) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  imprimir(entidad: Depreciacion) {
    this._entidad
      .buscarPorId(entidad.id)
      .pipe(abrirReporteProceso(this._pdf, 'DEPRECIACIÓN'), take(1));
  }

  eliminar(entidad: Depreciacion) {
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
      data: {
        codigo: entidad.comprobante,
        denominacion: 'Depreciación',
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() => this._entidad.eliminar(entidad.id, 'DEPRECIACION')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
