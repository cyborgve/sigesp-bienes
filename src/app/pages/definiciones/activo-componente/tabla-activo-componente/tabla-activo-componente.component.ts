import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, ViewChild, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AbstractTablaFunciones } from '@core/class/abstract-tabla-funciones';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ActivoComponente } from '@core/models/activo-componente';
import { ActivoComponenteService } from '@core/services/activo-componente.service';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { Id } from '@core/types/id';

@Component({
  selector: 'app-tabla-activo-componente',
  templateUrl: './tabla-activo-componente.component.html',
  styleUrls: ['./tabla-activo-componente.component.scss'],
})
export class TablaActivoComponenteComponent extends AbstractTablaFunciones<ActivoComponente> {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.ACTIVO_COMPONENTES;

  private urlPlural = '/definiciones/activo-componentes';
  private urlSingular = this.urlPlural + '/activo-componente';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/activo-componente/' + id;

  constructor(
    private _entidad: ActivoComponenteService,
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
        tap(activoComponentes => {
          this.dataSource = new MatTableDataSource(activoComponentes);
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

  editar(entidad: ActivoComponente) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: ActivoComponente) {
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

const data: ActivoComponente[] = [
  {
    empresaId: 10000000,
    id: 1,
    codigo: '1029384756',
    denominacion: 'Activo Componente 1',
    tipo: '10000000',
    marcaId: '10000000',
    modeloId: '10000000',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    codigo: '1029384755',
    denominacion: 'Activo Componente 2',
    tipo: '10000000',
    marcaId: '10000000',
    modeloId: '10000000',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    codigo: '1029384754',
    denominacion: 'Activo Componente 3',
    tipo: '10000000',
    marcaId: '10000000',
    modeloId: '10000000',
    creado: new Date(),
    modificado: new Date(),
  },
];
