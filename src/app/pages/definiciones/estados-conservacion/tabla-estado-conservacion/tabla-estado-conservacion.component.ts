import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import { Conservacion } from '@core/models/conservacion';
import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
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
import { TablaEntidad } from '@core/models/tabla-entidad';

@Component({
  selector: 'app-tabla-estado-conservacion',
  templateUrl: './tabla-estado-conservacion.component.html',
  styleUrls: ['./tabla-estado-conservacion.component.scss'],
})
export class TablaEstadoConservacionComponent
  implements TablaEntidad<Conservacion>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.CONSERVACION;
  @Output() dobleClick = new EventEmitter();

  dataSource: MatTableDataSource<Conservacion> = new MatTableDataSource();

  private urlPlural = '/definiciones/estados-conservacion';
  private urlSingular = this.urlPlural + '/estado-conservacion';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/estado-conservacion/' + id;

  constructor(
    private _entidad: ConservacionService,
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
