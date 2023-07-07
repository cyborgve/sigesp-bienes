import { first, tap, filter, switchMap, take, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Activo } from '@core/models/activo';
import { ActivoService } from '@core/services/activo.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { TablaEntidad } from '@core/models/tabla-entidad';
import { ordenarPorCodigo } from '@core/utils/operadores-rxjs';

type ActivoList = Pick<
  Activo,
  'id' | 'codigo' | 'denominacion' | 'creado' | 'modificado'
>;

@Component({
  selector: 'app-tabla-activo',
  templateUrl: './tabla-activo.component.html',
  styleUrls: ['./tabla-activo.component.scss'],
})
export class TablaActivoComponent
  implements TablaEntidad<Activo>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES['ACTIVOS'];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/activos';
  private urlSingular = this.urlPlural + '/activo';
  private urlSingularId = (id: Id) => this.urlPlural + '/activo/' + id;

  dataSource: MatTableDataSource<ActivoList> = new MatTableDataSource();

  constructor(
    private _entidad: ActivoService,
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
        map(entidades => entidades as ActivoList[]),
        ordenarPorCodigo(),
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

  editar(entidad: ActivoList) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: ActivoList) {
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
