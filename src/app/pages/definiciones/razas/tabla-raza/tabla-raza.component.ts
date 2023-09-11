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
import { Raza } from '@core/models/definiciones/raza';
import { RazaService } from '@core/services/definiciones/raza.service';
import { Id } from '@core/types/id';
import { DialogoEliminarDefinicionComponent } from '@shared/components/dialogo-eliminar-definicion/dialogo-eliminar-definicion.component';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { pipe } from 'rxjs';

const filtroInicial = () => pipe(map((razas: Raza[]) => razas));

@Component({
  selector: 'app-tabla-raza',
  templateUrl: './tabla-raza.component.html',
  styleUrls: ['./tabla-raza.component.scss'],
})
export class TablaRazaComponent implements TablaEntidad<Raza>, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() ocultarEncabezado: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.RAZAS;
  @Input() filtros = [filtroInicial()];
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/razas';
  private urlSingular = this.urlPlural + '/raza';
  private urlSingularId = (id: Id) => this.urlPlural + '/raza/' + id;

  dataSource: MatTableDataSource<Raza> = new MatTableDataSource();

  constructor(
    private _entidad: RazaService,
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

  editar(entidad: Raza) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Raza) {
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
        switchMap(() => this._entidad.eliminar(entidad.id, 'RAZA')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
