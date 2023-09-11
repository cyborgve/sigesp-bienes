import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { first, tap, filter, switchMap, take, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TipoSemoviente } from '@core/models/definiciones/tipo-semoviente';
import { TipoSemovienteService } from '@core/services/definiciones/tipo-semoviente.service';
import { Id } from '@core/types/id';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { pipe } from 'rxjs';

const filtroInicial = () =>
  pipe(map((tiposSemoviente: TipoSemoviente[]) => tiposSemoviente));

@Component({
  selector: 'app-tabla-tipo-semoviente',
  templateUrl: './tabla-tipo-semoviente.component.html',
  styleUrls: ['./tabla-tipo-semoviente.component.scss'],
})
export class TablaTipoSemovienteComponent
  implements TablaEntidad<TipoSemoviente>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.TIPOS_SEMOVIENTE;
  @Input() filtros = [filtroInicial()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/tipos-semoviente';
  private urlSingular = this.urlPlural + '/tipo-semoviente';
  private urlSingularId = (id: Id) => this.urlPlural + '/tipo-semoviente/' + id;

  dataSource: MatTableDataSource<TipoSemoviente> = new MatTableDataSource();

  constructor(
    private _entidad: TipoSemovienteService,
    private _location: Location,
    private _router: Router,
    private _dialog: MatDialog
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

  filtrar(event: Event) {
    let valorFiltro = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  nuevo() {
    this._router.navigate([this.urlSingular]);
  }

  editar(entidad: TipoSemoviente) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: TipoSemoviente) {
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
          this._entidad.eliminar(entidad.id, 'TIPO DE SEMOVIENTE')
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
