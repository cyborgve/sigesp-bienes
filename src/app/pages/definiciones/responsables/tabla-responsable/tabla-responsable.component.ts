import { first, tap, filter, switchMap, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
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

@Component({
  selector: 'app-tabla-responsable',
  templateUrl: './tabla-responsable.component.html',
  styleUrls: ['./tabla-responsable.component.scss'],
})
export class TablaResponsableComponent extends AbstractTablaFunciones<Responsable> {
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

  constructor(
    private _entidad: ResponsableService,
    private _location: Location,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    super();
    this.dataSource = new MatTableDataSource(data);
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

const data: Responsable[] = [
  {
    empresaId: 10000000,
    id: 1,
    tipo: 'Tipo Responsable 1',
    numeroCedula: 'V-12345678',
    nombreCompleto: 'Jose Manuel Camacaro Medina',
    telefonos: '+58(414)123-12-34',
    correoElectronico: 'jm_camacaro@medina.com',
    cargo: 'Arquitecto de Software',
    direccion:
      'Urb. Urbanizacion, Av. Avenida entre una calle y otra. Barquisimeto - Lara.',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    tipo: 'Tipo Responsable 2',
    numeroCedula: 'V-23456789',
    nombreCompleto: 'Carlos Gabriel Andrade Lopez',
    telefonos: '+58(414)123-45-67',
    correoElectronico: 'cg_andrade@lopez.com',
    cargo: 'C.E.O.',
    direccion:
      'Urb. Urbanizacion, Av. Avenida entre una calle y otra. Barquisimeto - Lara.',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    tipo: 'Tipo Responsable 3',
    numeroCedula: 'V-24567890',
    nombreCompleto: 'Maria Rutila Caceres Ramirez',
    telefonos: '+58(414)567-89-01',
    correoElectronico: 'mr_caceres@ramirez.com',
    cargo: 'Desarrolladora Full-Stack',
    direccion:
      'Urb. Urbanizacion, Av. Avenida entre una calle y otra. Barquisimeto - Lara.',
    creado: new Date(),
    modificado: new Date(),
  },
];
