import { first, tap, filter, switchMap, take } from 'rxjs/operators';
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
import { TipoSede } from '@core/models/tipo-sede';
import { TipoSedeService } from '@core/services/tipo-sede.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { TablaEntidad } from '@core/models/tabla-entidad';

@Component({
  selector: 'app-tabla-tipo-sede',
  templateUrl: './tabla-tipo-sede.component.html',
  styleUrls: ['./tabla-tipo-sede.component.scss'],
})
export class TablaTipoSedeComponent
  implements TablaEntidad<TipoSede>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.TIPOS_SEDE;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/tipos-sede';
  private urlSingular = this.urlPlural + '/tipo-sede';
  private urlSingularId = (id: Id) => this.urlPlural + '/tipo-sede/' + id;

  dataSource: MatTableDataSource<TipoSede> = new MatTableDataSource();

  constructor(
    private _entidad: TipoSedeService,
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

  editar(entidad: TipoSede) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: TipoSede) {
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
