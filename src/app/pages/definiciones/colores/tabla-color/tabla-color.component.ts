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
import { Color } from '@core/models/color';
import { ColorService } from '@core/services/color.service';
import { Id } from '@core/types/id';
import { EventEmitter } from 'events';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-tabla-color',
  templateUrl: './tabla-color.component.html',
  styleUrls: ['./tabla-color.component.scss'],
})
export class TablaColorComponent extends AbstractTablaFunciones<Color> {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.COLORES;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/colores';
  private urlSingular = this.urlPlural + '/color';
  private urlSingularId = (id: Id) => this.urlPlural + '/color/' + id;

  constructor(
    private _entidad: ColorService,
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
        tap(colores => {
          this.dataSource = new MatTableDataSource(colores);
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

  editar(entidad: Color) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Color) {
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

const data: Color[] = [
  {
    empresaId: 10000000,
    id: 1,
    codigo: '1029384756',
    denominacion: 'Color 1',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    codigo: '1029384755',
    denominacion: 'Color 2',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    codigo: '1029384754',
    denominacion: 'Color 3',
    creado: new Date(),
    modificado: new Date(),
  },
];
