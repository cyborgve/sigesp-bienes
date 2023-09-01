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
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';
import { ActaPrestamoService } from '@core/services/procesos/acta-prestamo.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { filter, first, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tabla-acta-prestamo',
  templateUrl: './tabla-acta-prestamo.component.html',
  styleUrls: ['./tabla-acta-prestamo.component.scss'],
})
export class TablaActaPrestamoComponent
  implements TablaEntidad<ActaPrestamo>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.ACTAS_PRESTAMO;
  @Input() ocultarEncabezado = false;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/procesos/actas-prestamo';
  private urlSingular = this.urlPlural + '/acta-prestamo';
  private urlSingularId = (id: Id) => this.urlPlural + '/acta-prestamo/' + id;
  dataSource: MatTableDataSource<ActaPrestamo> = new MatTableDataSource();

  constructor(
    private _entidad: ActaPrestamoService,
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

  imprimir(entidad: ActaPrestamo) {}
  previsualizar(entidad: ActaPrestamo) {}

  filtrar(event: Event) {
    let valorFiltro = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  nuevo() {
    this._router.navigate([this.urlSingular]);
  }

  editar(entidad: ActaPrestamo) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: ActaPrestamo) {
    let dialog = this._dialog.open(DialogoEliminarComponent, {
      data: {
        codigo: entidad.comprobante,
        denominacion: entidad.unidadAdministrativaCedente,
      },
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        switchMap(() => this._entidad.eliminar(entidad.id, 'ACTA DE PRESTAMO')),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
