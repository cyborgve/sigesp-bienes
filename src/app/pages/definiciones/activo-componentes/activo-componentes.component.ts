import { tap, first, switchMap, take } from 'rxjs/operators';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoComponente } from '@core/models/activo-componente';
import { ActivoComponenteService } from '@core/services/activo-componente.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogoEliminarComponent } from '@shared/components/dialogo-eliminar/dialogo-eliminar.component';

const data: ActivoComponente[] = [
  {
    empresaId: 10000000,
    id: 1,
    codigo: '1029384756',
    denominacion: 'Activo Componente 1',
    marcaId: '00000001',
    modeloId: '00000001',
    tipo: '00000001',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 2,
    codigo: '1029384755',
    denominacion: 'Activo Componente 2',
    marcaId: '00000001',
    modeloId: '00000001',
    tipo: '00000001',
    creado: new Date(),
    modificado: new Date(),
  },
  {
    empresaId: 10000000,
    id: 3,
    codigo: '1029384754',
    denominacion: 'Activo Componente 3',
    marcaId: '00000001',
    modeloId: '00000001',
    tipo: '00000001',
    creado: new Date(),
    modificado: new Date(),
  },
];

@Component({
  selector: 'app-activo-componentes',
  templateUrl: './activo-componentes.component.html',
  styleUrls: ['./activo-componentes.component.scss'],
})
export class ActivoComponentesComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  titulo = 'Activo Componentes';
  dataSource: MatTableDataSource<ActivoComponente> = new MatTableDataSource(
    data
  );
  displayedColumns: string[] = [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
    'acciones',
  ];

  constructor(
    private _activoComponente: ActivoComponenteService,
    private _location: Location,
    private _router: Router,
    private _dialog: MatDialog
  ) {}

  private recargarDatos() {
    this._activoComponente
      .buscarTodos()
      .pipe(
        first(),
        tap(activoComponentes => {
          this.dataSource = new MatTableDataSource(activoComponentes);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        })
      )
      .subscribe();
  }

  filtrarDatos(event: Event): void {
    let filterValue = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  atras = () => this._location.back();
  inicio = () => this._router.navigate(['/']);

  nuevo = () =>
    this._router.navigate([
      '/definiciones/activo-componentes/activo-componente',
    ]);

  editar = (componente: ActivoComponente) =>
    this._router.navigate([
      '/definiciones/activo-componentes/activo-componente/' + componente.id,
    ]);

  eliminar = (activoComponente: ActivoComponente) => {
    let dialog = this._dialog.open(DialogoEliminarComponent, {
      data: {
        codigo: activoComponente.codigo,
        denominacion: activoComponente.denominacion,
      },
    });
    dialog
      .afterClosed()
      .pipe(
        switchMap((confirmacion: boolean) =>
          this._activoComponente.eliminar(activoComponente.id)
        ),
        take(1)
      )
      .subscribe(() => this.recargarDatos());
  };
}
