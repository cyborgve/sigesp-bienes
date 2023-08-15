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
import { Color } from '@core/models/definiciones/color';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { ColorService } from '@core/services/definiciones/color.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { filter, first, switchMap, take, tap, map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';

const filtroInicial = () => pipe(map((colores: Color[]) => colores));

@Component({
  selector: 'app-tabla-color',
  templateUrl: './tabla-color.component.html',
  styleUrls: ['./tabla-color.component.scss'],
})
export class TablaColorComponent implements TablaEntidad<Color>, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.COLORES;
  @Input() filtros = [filtroInicial()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/colores';
  private urlSingular = this.urlPlural + '/color';
  private urlSingularId = (id: Id) => this.urlPlural + '/color/' + id;
  dataSource: MatTableDataSource<Color> = new MatTableDataSource();

  constructor(
    private _entidad: ColorService,
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

  editar(entidad: Color) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Color) {
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
        switchMap(() => this._entidad.eliminar(entidad.id, 'COLOR')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
