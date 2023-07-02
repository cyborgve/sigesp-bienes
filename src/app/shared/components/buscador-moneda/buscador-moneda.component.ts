import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TablaEntidad } from '@core/models/tabla-entidad';
import { Moneda } from '@core/models/moneda';
import { first, tap } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import {
  adaptarMonedas,
  filtrarValoresIniciales,
  ordenarPorCodigo,
} from '@core/utils/operadores-rxjs';

@Component({
  selector: 'app-buscador-moneda',
  templateUrl: './buscador-moneda.component.html',
  styleUrls: ['./buscador-moneda.component.scss'],
})
export class BuscadorMonedaComponent
  implements TablaEntidad<Moneda>, AfterViewInit
{
  titulo = 'buscador de monedas';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES.MONEDAS;
  dataSource: MatTableDataSource<Moneda> = new MatTableDataSource();

  constructor(
    private _dialogRef: MatDialogRef<BuscadorMonedaComponent>,
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._sigesp
      .getMonedas('todas')
      .pipe(
        first(),
        adaptarMonedas(),
        filtrarValoresIniciales(),
        ordenarPorCodigo(),
        tap(monedas => {
          this.dataSource = new MatTableDataSource(monedas);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        })
      )
      .subscribe();
  }

  seleccionar = (entidad: Moneda) => {
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

  editar(entidad: Moneda): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Moneda): void {
    throw new Error('Method not implemented.');
  }
}
