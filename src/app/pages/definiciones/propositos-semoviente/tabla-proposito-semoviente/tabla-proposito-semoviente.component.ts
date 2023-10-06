import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { first, tap, filter, switchMap, take } from 'rxjs/operators';
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
import { PropositoSemoviente } from '@core/models/definiciones/proposito-semoviente';
import { PropositoSemovienteService } from '@core/services/definiciones/proposito-semoviente.service';
import { Id } from '@core/types/id';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { filtroArranque } from '@core/utils/pipes-rxjs/operadores/filtro-inicial';

@Component({
  selector: 'app-tabla-proposito-semoviente',
  templateUrl: './tabla-proposito-semoviente.component.html',
  styleUrls: ['./tabla-proposito-semoviente.component.scss'],
})
export class TablaPropositoSemovienteComponent
  implements TablaEntidad<PropositoSemoviente>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.PROPOSITOS_SEMOVIENTE;
  @Input() filtros = [filtroArranque()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/propositos-semoviente';
  private urlSingular = this.urlPlural + '/proposito-semoviente';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/proposito-semoviente/' + id;

  dataSource: MatTableDataSource<PropositoSemoviente> =
    new MatTableDataSource();

  constructor(
    private _entidad: PropositoSemovienteService,
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
        tap((entidades: PropositoSemoviente[]) => {
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

  editar(entidad: PropositoSemoviente) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: PropositoSemoviente) {
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
          this._entidad.eliminar(entidad.id, 'PROPOSITO SEMOVIENTE')
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
