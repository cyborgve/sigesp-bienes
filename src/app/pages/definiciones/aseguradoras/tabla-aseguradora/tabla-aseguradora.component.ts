import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Aseguradora } from '@core/models/aseguradora';
import { MatTableDataSource } from '@angular/material/table';
import { AseguradoraService } from '@core/services/aseguradora.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Id } from '@core/types/id';
import { MatDialog } from '@angular/material/dialog';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';

@Component({
  selector: 'app-tabla-aseguradora',
  templateUrl: './tabla-aseguradora.component.html',
  styleUrls: ['./tabla-aseguradora.component.scss'],
})
export class TablaAseguradoraComponent
  implements TablaEntidad<Aseguradora>, AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.ASEGURADORAS;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/aseguradoras';
  private urlSingular = this.urlPlural + '/aseguradora';
  private urlSingularId = (id: Id) => this.urlPlural + '/aseguradora/' + id;
  dataSource: MatTableDataSource<Aseguradora> = new MatTableDataSource();

  constructor(
    private _entidad: AseguradoraService,
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

  editar(entidad: Aseguradora) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Aseguradora) {
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
        switchMap(() => this._entidad.eliminar(entidad.id)),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  }
}
