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
import { AbstractTablaFunciones } from '@core/class/abstract-tabla-funciones';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Responsable } from '@core/models/responsable';
import { ResponsableService } from '@core/services/responsable.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { TablaEntidad } from '@core/models/tabla-entidad';

@Component({
  selector: 'app-tabla-responsable',
  templateUrl: './tabla-responsable.component.html',
  styleUrls: ['./tabla-responsable.component.scss'],
})
export class TablaResponsableComponent
  implements TablaEntidad<Responsable>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.RESPONSABLES.filter(
    c => c !== 'tipo'
  )
    .filter(c => c !== 'direccion')
    .filter(c => c !== 'telefonos');
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/responsables';
  private urlSingular = this.urlPlural + '/responsable';
  private urlSingularId = (id: Id) => this.urlPlural + '/responsable/' + id;

  dataSource: MatTableDataSource<Responsable> = new MatTableDataSource();

  constructor(
    private _entidad: ResponsableService,
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

  editar(entidad: Responsable) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Responsable) {
    let dialog = this._dialog.open(DialogoEliminarComponent, {
      data: {
        codigo: entidad.numeroCedula,
        denominacion: entidad.nombreCompleto,
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
