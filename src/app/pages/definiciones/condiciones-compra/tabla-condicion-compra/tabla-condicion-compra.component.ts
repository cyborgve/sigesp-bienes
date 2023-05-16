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
import { CondicionCompra } from '@core/models/condicion-compra';
import { CondicionCompraService } from '@core/services/condicion-compra.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-tabla-condicion-compra',
  templateUrl: './tabla-condicion-compra.component.html',
  styleUrls: ['./tabla-condicion-compra.component.scss'],
})
export class TablaCondicionCompraComponent extends AbstractTablaFunciones<CondicionCompra> {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.CONDICIONES_COMPRA;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/condiciones-compra';
  private urlSingular = this.urlPlural + '/condicion-compra';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/condicion-compra/' + id;

  constructor(
    private _entidad: CondicionCompraService,
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

  editar(entidad: CondicionCompra) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: CondicionCompra) {
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

const data: CondicionCompra[] = [
  {
    empresaId: 10000000,
    id: 1,
    codigo: '1029384756',
    denominacion: 'Condicion Compra 1',
    explicacion: 'Condicion Compra 1',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    codigo: '1029384755',
    denominacion: 'Condicion Compra 2',
    explicacion: 'Condicion Compra 2',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    codigo: '1029384754',
    denominacion: 'Condicion Compra 3',
    explicacion: 'Condicion Compra 3',
    creado: new Date(),
    modificado: new Date(),
  },
];
