import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, ViewChild, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AbstractTablaFunciones } from '@core/class/abstract-tabla-funciones';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Clase } from '@core/models/clase';
import { ClaseService } from '@core/services/clase.service';
import { Id } from '@core/types/id';
import { EventEmitter } from 'events';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-tabla-clase',
  templateUrl: './tabla-clase.component.html',
  styleUrls: ['./tabla-clase.component.scss'],
})
export class TablaClaseComponent extends AbstractTablaFunciones<Clase> {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.CLASES;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/clases';
  private urlSingular = this.urlPlural + '/clase';
  private urlSingularId = (id: Id) => this.urlPlural + '/clase/' + id;

  constructor(
    private _entidad: ClaseService,
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
        tap(clases => {
          this.dataSource = new MatTableDataSource(clases);
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

  editar(entidad: Clase) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Clase) {
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

const data: Clase[] = [
  {
    empresaId: 10000000,
    id: 1,
    codigo: '1029384756',
    denominacion: 'Clase 1',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    codigo: '1029384755',
    denominacion: 'Clase 2',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    codigo: '1029384754',
    denominacion: 'Clase 3',
    creado: new Date(),
    modificado: new Date(),
  },
];
