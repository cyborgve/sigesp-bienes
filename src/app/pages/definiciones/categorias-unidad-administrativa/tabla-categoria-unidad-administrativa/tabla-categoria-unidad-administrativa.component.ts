import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CategoriaUnidadAdministrativaService } from '@core/services/categoria-unidad-administrativa.service';
import { CategoriaUnidadAdministr } from '@core/models/categoria-unidad-administrativa';
import { Location } from '@angular/common';
import { Id } from '@core/types/id';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { TablaEntidad } from '@core/models/tabla-entidad';

@Component({
  selector: 'app-tabla-categoria-unidad-administrativa',
  templateUrl: './tabla-categoria-unidad-administrativa.component.html',
  styleUrls: ['./tabla-categoria-unidad-administrativa.component.scss'],
})
export class TablaCategoriaUnidadAdministrativaComponent
  implements TablaEntidad<CategoriaUnidadAdministr>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] =
    COLUMNAS_VISIBLES.CATEGORIAS_UNIDAD_ADMINISTRATIVA;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/categorias-unidad-administrativa';
  private urlSingular = this.urlPlural + '/categoria-unidad-administrativa';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/categoria-unidad-administrativa/' + id;

  dataSource: MatTableDataSource<CategoriaUnidadAdministr> =
    new MatTableDataSource();

  constructor(
    private _entidad: CategoriaUnidadAdministrativaService,
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

  editar(entidad: CategoriaUnidadAdministr) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: CategoriaUnidadAdministr) {
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
