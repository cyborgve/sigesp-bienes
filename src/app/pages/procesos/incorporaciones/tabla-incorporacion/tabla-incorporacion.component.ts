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
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { PDFService } from '@core/services/auxiliares/pdf.service';
import { IncorporacionService } from '@core/services/procesos/incorporacion.service';
import { Id } from '@core/types/id';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { pipe } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { filter, first, switchMap, take, tap, map } from 'rxjs/operators';

const filtroInicial = () =>
  pipe(map((incorporacioes: Incorporacion[]) => incorporacioes));

@Component({
  selector: 'app-tabla-incorporacion',
  templateUrl: './tabla-incorporacion.component.html',
  styleUrls: ['./tabla-incorporacion.component.scss'],
})
export class TablaIncorporacionComponent
  implements TablaEntidad<Incorporacion>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.INCORPORACIONES;
  @Input() filtros = [filtroInicial()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/procesos/incorporaciones';
  private urlSingular = this.urlPlural + '/incorporacion';
  private urlSingularId = (id: Id) => this.urlPlural + '/incorporacion/' + id;
  dataSource: MatTableDataSource<Incorporacion> = new MatTableDataSource();

  constructor(
    private _entidad: IncorporacionService,
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
        pipeFromArray(this.filtros),
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

  imprimir(entidad: Incorporacion) {
    this._entidad
      .buscarPorId(entidad.id)
      .pipe(
        tap(incorporacion =>
          this._pdf.abrirReportePDF(incorporacion, 'INCORPORACIÓN')
        ),
        take(1)
      )
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

  editar(entidad: Incorporacion) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Incorporacion) {
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
      data: {
        codigo: entidad.comprobante,
        denominacion: entidad.unidadAdministrativa,
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() => this._entidad.eliminar(entidad.id, 'INCORPORACION')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
