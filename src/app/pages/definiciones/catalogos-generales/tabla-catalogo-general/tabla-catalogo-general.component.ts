import { first, tap, filter, switchMap, take } from 'rxjs/operators';
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
import { CatalogoGeneral } from '@core/models/definiciones/catalogo-general';
import { CatalogoGeneralService } from '@core/services/definiciones/catalogo-general.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-tabla-catalogo-general',
  templateUrl: './tabla-catalogo-general.component.html',
  styleUrls: ['./tabla-catalogo-general.component.scss'],
})
export class TablaCatalogoGeneralComponent
  implements TablaEntidad<CatalogoGeneral>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.CATALOGO_GENERAL;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/catalogos-generales';
  private urlSingular = this.urlPlural + '/catalogo-general';
  private urlSingularId = (id: Id) =>
    this.urlPlural + '/catalogo-general/' + id;
  dataSource: MatTableDataSource<CatalogoGeneral> = new MatTableDataSource();

  constructor(
    private _entidad: CatalogoGeneralService,
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

  editar(entidad: CatalogoGeneral) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: CatalogoGeneral) {
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
        switchMap(() => this._entidad.eliminar(entidad.id, this.titulo)),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
