import { pipeFromArray } from 'rxjs/internal/util/pipe';
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
import { TipoCobertura } from '@core/models/definiciones/tipo-cobertura';
import { TipoCoberturaService } from '@core/services/definiciones/tipo-cobertura.service';
import { Id } from '@core/types/id';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { pipe } from 'rxjs';

const filtroInicial = () =>
  pipe(map((tiposCobertura: TipoCobertura[]) => tiposCobertura));

@Component({
  selector: 'app-tabla-tipo-cobertura',
  templateUrl: './tabla-tipo-cobertura.component.html',
  styleUrls: ['./tabla-tipo-cobertura.component.scss'],
})
export class TablaTipoCoberturaComponent
  implements TablaEntidad<TipoCobertura>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.TIPOS_COBERTURA;
  @Input() filtros = [filtroInicial()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/tipos-cobertura';
  private urlSingular = this.urlPlural + '/tipo-cobertura';
  private urlSingularId = (id: Id) => this.urlPlural + '/tipo-cobertura/' + id;

  dataSource: MatTableDataSource<TipoCobertura> = new MatTableDataSource();

  constructor(
    private _entidad: TipoCoberturaService,
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
        tap(entidad => {
          this.dataSource = new MatTableDataSource(entidad);
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

  editar(entidad: TipoCobertura) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: TipoCobertura) {
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
        switchMap(() =>
          this._entidad.eliminar(entidad.id, 'TIPO DE COBERTURA')
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
