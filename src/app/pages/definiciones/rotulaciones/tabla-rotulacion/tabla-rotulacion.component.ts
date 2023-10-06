import { pipeFromArray } from 'rxjs/internal/util/pipe';
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
import { Rotulacion } from '@core/models/definiciones/rotulacion';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { RotulacionService } from '@core/services/definiciones/rotulacion.service';
import { Id } from '@core/types/id';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';
import { filtroArranque } from '@core/utils/pipes-rxjs/operadores/filtro-inicial';

@Component({
  selector: 'app-tabla-rotulacion',
  templateUrl: './tabla-rotulacion.component.html',
  styleUrls: ['./tabla-rotulacion.component.scss'],
})
export class TablaRotulacionComponent
  implements TablaEntidad<Rotulacion>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.ROTULACIONES;
  @Input() filtros = [filtroArranque()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/rotulaciones';
  private urlSingular = this.urlPlural + '/rotulacion';
  private urlSingularId = (id: Id) => this.urlPlural + '/rotulacion/' + id;

  dataSource: MatTableDataSource<Rotulacion> = new MatTableDataSource();

  constructor(
    private _entidad: RotulacionService,
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
        tap((entidades: Rotulacion[]) => {
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

  editar(entidad: Rotulacion) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Rotulacion) {
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
        switchMap(() => this._entidad.eliminar(entidad.id, 'ROTULACION')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
