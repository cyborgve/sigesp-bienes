import { first, tap, filter, switchMap, take } from 'rxjs/operators';
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
import { Seguro } from '@core/models/definiciones/seguro';
import { SeguroService } from '@core/services/seguro.service';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { Location } from '@angular/common';
import { Id } from '@core/types/id';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';

@Component({
  selector: 'app-tabla-seguro',
  templateUrl: './tabla-seguro.component.html',
  styleUrls: ['./tabla-seguro.component.scss'],
})
export class TablaSeguroComponent
  implements TablaEntidad<Seguro>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.SEGUROS;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/seguros';
  private urlSingular = this.urlPlural + '/seguro';
  private urlSingularId = (id: Id) => this.urlPlural + '/seguro/' + id;

  dataSource: MatTableDataSource<Seguro> = new MatTableDataSource();

  constructor(
    private _entidad: SeguroService,
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

  editar(entidad: Seguro) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Seguro) {
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
        switchMap(() => this._entidad.eliminar(entidad.id, 'SEGURO')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
