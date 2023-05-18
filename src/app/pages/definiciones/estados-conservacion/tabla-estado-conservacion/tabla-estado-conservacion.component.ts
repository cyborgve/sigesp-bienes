import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import { Conservacion } from '@core/models/conservacion';
import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { AbstractTablaFunciones } from '@core/class/abstract-tabla-funciones';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Id } from '@core/types/id';
import { ConservacionService } from '@core/services/conservacion.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-tabla-estado-conservacion',
  templateUrl: './tabla-estado-conservacion.component.html',
  styleUrls: ['./tabla-estado-conservacion.component.scss'],
})
export class TablaEstadoConservacionComponent extends AbstractTablaFunciones<Conservacion> {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.CONSERVACION;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/estados-conservacion';
  private urlSingular = this.urlPlural + '/estado-conservacion';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/estado-conservacion/' + id;

  constructor(
    private _entidad: ConservacionService,
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
        tap(condicionesCompra => {
          this.dataSource = new MatTableDataSource(condicionesCompra);
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

  editar(entidad: Conservacion) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Conservacion) {
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

const data: Conservacion[] = [
  {
    empresaId: 10000000,
    id: 1,
    codigo: '1029384756',
    denominacion: 'Estado Conservacion 1',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    codigo: '1029384755',
    denominacion: 'Estado Conservacion 2',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    codigo: '1029384754',
    denominacion: 'Estado Conservacion 3',
    creado: new Date(),
    modificado: new Date(),
  },
];
