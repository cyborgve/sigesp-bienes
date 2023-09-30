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
import { Municipio } from '@core/models/otros-modulos/municipio';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { MunicipioService } from '@core/services/otros-modulos/municipio.service';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';
import { pipe } from 'rxjs';

const filtroInicial = () => pipe(map((municipios: Municipio[]) => municipios));

@Component({
  selector: 'app-buscador-municipio',
  templateUrl: './buscador-municipio.component.html',
  styleUrls: ['./buscador-municipio.component.scss'],
})
export class BuscadorMunicipioComponent
  implements TablaEntidad<Municipio>, AfterViewInit
{
  titulo = 'buscador de municipios';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['MUNICIPIOS'];
  dataSource: MatTableDataSource<Municipio> = new MatTableDataSource();
  @Input() filtros = [filtroInicial()];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorMunicipioComponent>,
    private _municipio: MunicipioService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._municipio
      .buscarTodos()
      .pipe(
        first(),
        filtrarValoresIniciales(),
        ordenarPorCodigo(),
        pipeFromArray(this.filtros),
        tap(cuentas => {
          this.dataSource = new MatTableDataSource(cuentas);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        })
      )
      .subscribe();
  }

  seleccionar = (entidad: Municipio) => {
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

  editar(entidad: Municipio): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Municipio): void {
    throw new Error('Method not implemented.');
  }
}
