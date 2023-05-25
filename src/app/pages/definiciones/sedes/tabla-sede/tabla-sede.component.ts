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
import { Sede } from '@core/models/sede';
import { SedeService } from '@core/services/sede.service';
import { Id } from '@core/types/id';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-tabla-sede',
  templateUrl: './tabla-sede.component.html',
  styleUrls: ['./tabla-sede.component.scss'],
})
export class TablaSedeComponent
  extends AbstractTablaFunciones<Sede>
  implements AfterViewInit
{
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() titulo: string = '';
  @Input() ocultarNuevo: boolean = false;
  @Input() columnasVisibles: string[] = COLUMNAS_VISIBLES.SEDES;
  @Output() dobleClick = new EventEmitter();

  private urlPlural = '/definiciones/sedes';
  private urlSingular = this.urlPlural + '/sede';
  private urlSingularId = (id: Id) => this.urlPlural + '/sede/' + id;

  constructor(
    private _entidad: SedeService,
    private _location: Location,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    super();
  }

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

  editar(entidad: Sede) {
    this._router.navigate([this.urlSingularId(entidad.id)]);
  }

  eliminar(entidad: Sede) {
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

const data: Sede[] = [
  {
    empresaId: 10000000,
    id: 1,
    codigo: '1029384756',
    denominacion: 'Sede 1',
    tipo: 'Tipo 1',
    localizacion: 'Nacional',
    paisId: 'Venezuela',
    estadoId: 'Lara',
    municipioId: 'Iribarren',
    parroquiaId: 'Catedral',
    ciudadId: 'Barquisimeto',
    urbanizacion: 'Urb. Urbanizacion',
    calleAvenida: 'Av. Avenida',
    casaEdificio: 'Calle',
    piso: 'Piso',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    codigo: '1029384755',
    denominacion: 'Sede 2',
    tipo: 'Tipo 1',
    localizacion: 'Nacional',
    paisId: 'Venezuela',
    estadoId: 'Lara',
    municipioId: 'Iribarren',
    parroquiaId: 'Catedral',
    ciudadId: 'Barquisimeto',
    urbanizacion: 'Urb. Urbanizacion',
    calleAvenida: 'Av. Avenida',
    casaEdificio: 'Calle',
    piso: 'Piso',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    codigo: '1029384754',
    denominacion: 'Sede 3',
    tipo: 'Tipo 1',
    localizacion: 'Nacional',
    paisId: 'Venezuela',
    estadoId: 'Lara',
    municipioId: 'Iribarren',
    parroquiaId: 'Catedral',
    ciudadId: 'Barquisimeto',
    urbanizacion: 'Urb. Urbanizacion',
    calleAvenida: 'Av. Avenida',
    casaEdificio: 'Calle',
    piso: 'Piso',
    creado: new Date(),
    modificado: new Date(),
  },
];
