import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AbstractTablaFunciones } from '@core/class/abstract-tabla-funciones';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ComponenteActivo } from '@core/models/componente-activo';
import { TablaEntidad } from '@core/models/tabla-entidad';
import { ComponenteActivoService } from '@core/services/componente-activo.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-componente-activo',
  templateUrl: './tabla-componente-activo.component.html',
  styleUrls: ['./tabla-componente-activo.component.scss'],
})
export class TablaComponenteActivoComponent
  implements TablaEntidad<ComponenteActivo>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.COMPONENTES_ACTIVO;
  @Output() dobleClick = new EventEmitter();

  dataSource: MatTableDataSource<ComponenteActivo> = new MatTableDataSource();

  private urlPlural = '/definiciones/componentes-activo';
  private urlSingular = this.urlPlural + '/componente-activo';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/componente-activo/' + id;

  constructor(
    private _entidad: ComponenteActivoService,
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
        tap(causasMovimiento => {
          this.dataSource = new MatTableDataSource(causasMovimiento);
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

  editar(entidad: ComponenteActivo) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: ComponenteActivo) {
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
