import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { first, tap, map, take } from 'rxjs/operators';
import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { Responsable } from '@core/models/otros-modulos/responsable';
import { SigespService } from 'sigesp';
import { adaptarResposables } from '@core/utils/pipes-rxjs/adaptadores/adaptar-responsables';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { Location } from '@angular/common';
import { pipe } from 'rxjs';
import { ResponsableService } from '@core/services/otros-modulos/responsable.service';

const filtroInicial = () =>
  pipe(map((responsables: Responsable[]) => responsables));

@Component({
  selector: 'app-buscador-responsable',
  templateUrl: './buscador-responsable.component.html',
  styleUrls: ['./buscador-responsable.component.scss'],
})
export class BuscadorResponsableComponent
  implements TablaEntidad<Responsable>, AfterViewInit
{
  titulo = 'buscador de Responsables';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['RESPONSABLES'];
  dataSource: MatTableDataSource<Responsable> = new MatTableDataSource();
  @Input() filtros = [filtroInicial()];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorResponsableComponent>,
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router,
    private _responsable: ResponsableService
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._responsable
      .buscarTodos()
      .pipe(
        pipeFromArray(this.filtros),
        tap(responsables => {
          this.dataSource = new MatTableDataSource(responsables);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        }),
        take(1)
      )
      .subscribe();
  }

  seleccionar = (entidad: Responsable) => {
    this._dialogRef.close(entidad);
  };

  irAtras(): void {
    this._location.back();
  }

  irAlInicio(): void {
    this._router.navigate(['/definitions']);
  }

  filtrar(event: Event): void {
    let valorFiltro = event ? (event.target as HTMLInputElement).value : '';
    this.dataSource.filter = valorFiltro.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  nuevo(): void {
    throw new Error('Method not implemented.');
  }

  editar(entidad: Responsable): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Responsable): void {
    throw new Error('Method not implemented.');
  }
}
