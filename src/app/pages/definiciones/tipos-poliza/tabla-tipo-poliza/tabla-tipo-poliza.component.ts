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
import { TipoPoliza } from '@core/models/definiciones/tipo-poliza';
import { TipoPolizaService } from '@core/services/definiciones/tipo-poliza.service';
import { Id } from '@core/types/id';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { filtroArranque } from '@core/utils/pipes-rxjs/operadores/filtro-inicial';

@Component({
  selector: 'app-tabla-tipo-poliza',
  templateUrl: './tabla-tipo-poliza.component.html',
  styleUrls: ['./tabla-tipo-poliza.component.scss'],
})
export class TablaTipoPolizaComponent
  implements TablaEntidad<TipoPoliza>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.TIPOS_POLIZA;
  @Input() filtros = [filtroArranque()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/tipos-poliza';
  private urlSingular = this.urlPlural + '/tipo-poliza';
  private urlSingularId = (id: Id) => this.urlPlural + '/tipo-poliza/' + id;

  dataSource: MatTableDataSource<TipoPoliza> = new MatTableDataSource();

  constructor(
    private _entidad: TipoPolizaService,
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
        pipeFromArray(this.filtros),
        tap((entidades: TipoPoliza[]) => {
          this.dataSource = new MatTableDataSource(entidades);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }),
        first()
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

  editar(entidad: TipoPoliza) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: TipoPoliza) {
    let dialog = this._dialog.open(DialogoEliminarDefinicionComponent, {
      data: {
        codigo: entidad.codigo,
        denominacion: entidad.denominacion,
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() => this._entidad.eliminar(entidad.id, 'TIPO DE POLIZA')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
