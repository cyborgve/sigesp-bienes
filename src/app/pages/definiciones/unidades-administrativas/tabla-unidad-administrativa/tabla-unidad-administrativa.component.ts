import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import {
  Component,
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
import { AbstractTablaFunciones } from '@core/class/abstract-tabla-funciones';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { UnidadAdministrativa } from '@core/models/unidad-administrativa';
import { UnidadAdministrativaService } from '@core/services/unidad-administrativa.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-tabla-unidad-administrativa',
  templateUrl: './tabla-unidad-administrativa.component.html',
  styleUrls: ['./tabla-unidad-administrativa.component.scss'],
})
export class TablaUnidadAdministrativaComponent extends AbstractTablaFunciones<UnidadAdministrativa> {
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

  constructor(
    private _entidad: UnidadAdministrativaService,
    private _location: Location,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    super();
    this.dataSource = new MatTableDataSource(data);
  }

  private recargarDatos() {
    this._entidad
      .buscarTodos()
      .pipe(
        first(),
        tap(entidad => {
          this.dataSource = new MatTableDataSource(entidad);
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

const data: UnidadAdministrativa[] = [
  {
    empresaId: 10000000,
    id: 1,
    codigo: '1029384756',
    categoriaId: 12345678,
    denominacion: 'Unidad Administrativa 1',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    codigo: '1029384755',
    categoriaId: 12345678,
    denominacion: 'Unidad Administrativa 2',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    codigo: '1029384754',
    categoriaId: 12345678,
    denominacion: 'Unidad Administrativa 3',
    creado: new Date(),
    modificado: new Date(),
  },
];
