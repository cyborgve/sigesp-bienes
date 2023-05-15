import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Categoria } from '@core/models/categoria';
import { AbstractTablaFunciones } from '@core/class/abstract-tabla-funciones';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriaService } from '@core/services/categoria.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Id } from '@core/types/id';
import { MatDialog } from '@angular/material/dialog';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-tabla-categoria',
  templateUrl: './tabla-categoria.component.html',
  styleUrls: ['./tabla-categoria.component.scss'],
})
export class TablaCategoriaComponent extends AbstractTablaFunciones<Categoria> {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.ASEGURADORAS;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/categorias';
  private urlSingular = this.urlPlural + '/categoria';
  private urlSingularId = (id: Id) => this.urlPlural + '/categoria/' + id;

  constructor(
    private _entidad: CategoriaService,
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
        tap(categorias => {
          this.dataSource = new MatTableDataSource(categorias);
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

  editar(entidad: Categoria) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Categoria) {
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

const data: Categoria[] = [
  {
    empresaId: 10000000,
    id: 1,
    codigo: '1029384756',
    denominacion: 'Categoria 1',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    codigo: '1029384755',
    denominacion: 'Categoria 2',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    codigo: '1029384754',
    denominacion: 'Categoria 3',
    creado: new Date(),
    modificado: new Date(),
  },
];
