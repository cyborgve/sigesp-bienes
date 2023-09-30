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
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { Parroquia } from '@core/models/otros-modulos/parroquia';
import { ParroquiaService } from '@core/services/otros-modulos/parroquia.service';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';
import { pipe } from 'rxjs';

const filtroInicial = () => pipe(map((parroquias: Parroquia[]) => parroquias));

@Component({
  selector: 'app-buscador-parroquia',
  templateUrl: './buscador-parroquia.component.html',
  styleUrls: ['./buscador-parroquia.component.scss'],
})
export class BuscadorParroquiaComponent
  implements TablaEntidad<Parroquia>, AfterViewInit
{
  titulo = 'buscador de parroquias';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['PARROQUIAS'];
  dataSource: MatTableDataSource<Parroquia> = new MatTableDataSource();
  @Input() filtros = [filtroInicial()];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorParroquiaComponent>,
    private _parroquias: ParroquiaService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._parroquias
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

  seleccionar = (entidad: Parroquia) => {
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

  editar(entidad: Parroquia): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Parroquia): void {
    throw new Error('Method not implemented.');
  }
}
