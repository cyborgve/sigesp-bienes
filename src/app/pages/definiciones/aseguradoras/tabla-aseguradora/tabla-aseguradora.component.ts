import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Aseguradora } from '@core/models/aseguradora';
import { AbstractTablaFunciones } from '@core/class/abstract-tabla-funciones';
import { MatTableDataSource } from '@angular/material/table';
import { AseguradoraService } from '@core/services/aseguradora.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Id } from '@core/types/id';
import { MatDialog } from '@angular/material/dialog';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

const data: Aseguradora[] = [
  {
    empresaId: 10000000,
    id: 1,
    codigo: '1029384756',
    denominacion: 'Aseguradora 1',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    codigo: '1029384755',
    denominacion: 'Aseguradora 2',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    codigo: '1029384754',
    denominacion: 'Aseguradora 3',
    creado: new Date(),
    modificado: new Date(),
  },
];

@Component({
  selector: 'app-tabla-aseguradora',
  templateUrl: './tabla-aseguradora.component.html',
  styleUrls: ['./tabla-aseguradora.component.scss'],
})
export class TablaAseguradoraComponent extends AbstractTablaFunciones<Aseguradora> {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.ASEGURADORAS;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/aseguradoras';
  private urlSingular = this.urlPlural + '/aseguradora';
  private urlSingularId = (id: Id) => this.urlPlural + '/aseguradora/' + id;

  constructor(
    private _entidad: AseguradoraService,
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
        tap(aseguradoras => {
          this.dataSource = new MatTableDataSource(aseguradoras);
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

  editar(entidad: Aseguradora) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Aseguradora) {
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
