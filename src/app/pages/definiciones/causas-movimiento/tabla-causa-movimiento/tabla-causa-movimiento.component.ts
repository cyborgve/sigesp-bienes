import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import {
  Component,
  ViewChild,
  Input,
  Output,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { CausaMovimiento } from '@core/models/definiciones/causa-movimiento';
import { CausaMovimientoService } from '@core/services/definiciones/causa-movimiento.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';

@Component({
  selector: 'app-tabla-causa-movimiento',
  templateUrl: './tabla-causa-movimiento.component.html',
  styleUrls: ['./tabla-causa-movimiento.component.scss'],
})
export class TablaCausaMovimientoComponent
  implements TablaEntidad<CausaMovimiento>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.CAUSAS_MOVIMIENTO;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/causas-movimiento';
  private urlSingular = this.urlPlural + '/causa-movimiento';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/causa-movimiento/' + id;

  dataSource: MatTableDataSource<CausaMovimiento> = new MatTableDataSource();

  constructor(
    private _entidad: CausaMovimientoService,
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

  editar(entidad: CausaMovimiento) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: CausaMovimiento) {
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
          this._entidad.eliminar(entidad.id, 'CAUSA DE MOVIMIENTO')
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
