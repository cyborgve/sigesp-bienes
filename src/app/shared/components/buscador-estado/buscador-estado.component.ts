import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { first, tap, map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Estado } from '@core/models/otros-modulos/estado';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { EstadoService } from '@core/services/otros-modulos/estado.service';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';
import { pipe } from 'rxjs';

const filtroInicial = () => pipe(map((estados: Estado[]) => estados));

@Component({
  selector: 'app-buscador-estado',
  templateUrl: './buscador-estado.component.html',
  styleUrls: ['./buscador-estado.component.scss'],
})
export class BuscadorEstadoComponent
  implements TablaEntidad<Estado>, AfterViewInit
{
  titulo = 'buscador de estados';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['ESTADOS'];
  dataSource: MatTableDataSource<Estado> = new MatTableDataSource();
  @Input() filtros = [filtroInicial()];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorEstadoComponent>,
    private _estado: EstadoService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._estado
      .buscarTodos()
      .pipe(
        filtrarValoresIniciales(),
        ordenarPorCodigo(),
        pipeFromArray(this.filtros),
        tap(cuentas => {
          this.dataSource = new MatTableDataSource(cuentas);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        }),
        first()
      )
      .subscribe();
  }

  seleccionar = (entidad: Estado) => {
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

  editar(entidad: Estado): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Estado): void {
    throw new Error('Method not implemented.');
  }
}
