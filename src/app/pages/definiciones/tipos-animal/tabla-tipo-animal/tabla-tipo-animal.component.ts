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
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { TipoAnimal } from '@core/models/definiciones/tipo-animal';
import { TipoAnimalService } from '@core/services/definiciones/tipo-animal.service';
import { Id } from '@core/types/id';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { pipe } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { filter, first, switchMap, take, tap, map } from 'rxjs/operators';

const filtroInicial = () =>
  pipe(map((tiposAnimal: TipoAnimal[]) => tiposAnimal));

@Component({
  selector: 'app-tabla-tipo-animal',
  templateUrl: './tabla-tipo-animal.component.html',
  styleUrls: ['./tabla-tipo-animal.component.scss'],
})
export class TablaTipoAnimalComponent
  implements TablaEntidad<TipoAnimal>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.TIPOS_ANIMAL;
  @Input() filtros = [filtroInicial()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/tipos-animal';
  private urlSingular = this.urlPlural + '/tipo-animal';
  private urlSingularId = (id: Id) => this.urlPlural + '/tipo-animal/' + id;
  dataSource: MatTableDataSource<TipoAnimal> = new MatTableDataSource();

  constructor(
    private _entidad: TipoAnimalService,
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
        ordenarPorCodigo(),
        tap(entidades => {
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

  editar(entidad: TipoAnimal) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: TipoAnimal) {
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
        switchMap(() => this._entidad.eliminar(entidad.id, 'TIPO DE ANIMAL')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
