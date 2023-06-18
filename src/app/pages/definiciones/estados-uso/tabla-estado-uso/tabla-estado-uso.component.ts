import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import { EstadoUso } from '@core/models/estado-uso';
import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { EstadoUsoService } from '@core/services/estado-uso.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { TablaEntidad } from '@core/models/tabla-entidad';

@Component({
  selector: 'app-tabla-estado-uso',
  templateUrl: './tabla-estado-uso.component.html',
  styleUrls: ['./tabla-estado-uso.component.scss'],
})
export class TablaEstadoUsoComponent
  implements TablaEntidad<EstadoUso>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.ESTADOS_USO;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/estados-uso';
  private urlSingular = this.urlPlural + '/estado-uso';
  private urlSingularId = (id: Id) => this.urlPlural + '/estado-uso/' + id;

  dataSource: MatTableDataSource<EstadoUso> = new MatTableDataSource();

  constructor(
    private _entidad: EstadoUsoService,
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

  editar(entidad: EstadoUso) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: EstadoUso) {
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
