import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { EstadoConservacion } from '@core/models/definiciones/estado-conservacion';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { EstadoConservacionService } from '@core/services/estado-conservacion.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-estado-conservacion',
  templateUrl: './tabla-estado-conservacion.component.html',
  styleUrls: ['./tabla-estado-conservacion.component.scss'],
})
export class TablaEstadoConservacionComponent
  implements TablaEntidad<EstadoConservacion>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.ESTADOS_CONSERVACION;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/estados-conservacion';
  private urlSingular = this.urlPlural + '/estado-conservacion';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/estado-conservacion/' + id;
  dataSource: MatTableDataSource<EstadoConservacion> = new MatTableDataSource();

  constructor(
    private _entidad: EstadoConservacionService,
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

  editar(entidad: EstadoConservacion) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: EstadoConservacion) {
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
          this._entidad.eliminar(entidad.id, 'ESTADO DE CONSERVACION')
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
