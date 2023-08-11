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
import { CategoriaUnidadAdministrativa } from '@core/models/definiciones/categoria-unidad-administrativa';
import { CategoriaUnidadAdministrativaService } from '@core/services/definiciones/categoria-unidad-administrativa.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-tabla-categoria-unidad',
  templateUrl: './tabla-categoria-unidad.component.html',
  styleUrls: ['./tabla-categoria-unidad.component.scss'],
})
export class TablaCategoriaUnidadComponent
  implements TablaEntidad<CategoriaUnidadAdministrativa>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] =
    COLUMNAS_VISIBLES.CATEGORIAS_UNIDAD_ADMINISTRATIVA;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/categorias-unidad-administrativa';
  private urlSingular = this.urlPlural + '/categoria-unidad-administrativa';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/categoria-unidad-administrativa/' + id;
  dataSource: MatTableDataSource<CategoriaUnidadAdministrativa> =
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

  editar(entidad: CategoriaUnidadAdministrativa) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: CategoriaUnidadAdministrativa) {
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
        switchMap(() =>
          this._entidad.eliminar(
            entidad.id,
            'CATEGORIA DE UNIDAD ADMINISTRATIVA'
          )
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
