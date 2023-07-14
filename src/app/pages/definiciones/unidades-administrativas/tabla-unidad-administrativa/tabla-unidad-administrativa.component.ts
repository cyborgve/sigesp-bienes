import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { UnidadAdministrativa } from '@core/models/definiciones/unidad-administrativa';
import { UnidadAdministrativaService } from '@core/services/unidad-administrativa.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-tabla-unidad-administrativa',
  templateUrl: './tabla-unidad-administrativa.component.html',
  styleUrls: ['./tabla-unidad-administrativa.component.scss'],
})
export class TablaUnidadAdministrativaComponent
  implements TablaEntidad<UnidadAdministrativa>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] =
    COLUMNAS_VISIBLES.UNIDADES_ADMINISTRATIVAS;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/unidades-administrativas';
  private urlSingular = this.urlPlural + '/unidad-administrativa';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/unidad-administrativa/' + id;
  dataSource: MatTableDataSource<UnidadAdministrativa> =
    new MatTableDataSource();

  constructor(
    private _entidad: UnidadAdministrativaService,
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
        first(),
        tap(entidades => {
          this.dataSource = new MatTableDataSource(entidades);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
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

  editar(entidad: UnidadAdministrativa) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: UnidadAdministrativa) {
    let dialog = this._dialog.open(DialogoEliminarComponent, {
      data: {
        codigo: entidad.codigo,
        denominacion: entidad.denominacion,
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() => this._entidad.eliminar(entidad.id)),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
