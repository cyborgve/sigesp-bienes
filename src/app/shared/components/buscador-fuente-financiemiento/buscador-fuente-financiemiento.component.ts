import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { FuenteFinanciemiento } from '@core/models/otros-modulos/fuente-financiemiento';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { first, tap } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { adaptarFuentesFinanciemiento } from '@core/utils/adaptadores-rxjs.ts/adaptar-fuentes-financiamiento';
import { filtrarValoresIniciales } from '@core/utils/operadores-rxjs/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/operadores-rxjs/ordenar-por-codigo';

@Component({
  selector: 'app-buscador-fuente-financiemiento',
  templateUrl: './buscador-fuente-financiemiento.component.html',
  styleUrls: ['./buscador-fuente-financiemiento.component.scss'],
})
export class BuscadorFuenteFinanciemientoComponent
  implements TablaEntidad<FuenteFinanciemiento>, AfterViewInit
{
  titulo = 'buscador de fuentes de financiemiento';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['FUENTES_FINANCIEMIENTO'];
  dataSource: MatTableDataSource<FuenteFinanciemiento> =
    new MatTableDataSource();

  constructor(
    private _dialogRef: MatDialogRef<BuscadorFuenteFinanciemientoComponent>,
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._sigesp
      .getFuenteFinanciamiento()
      .pipe(
        first(),
        adaptarFuentesFinanciemiento(),
        filtrarValoresIniciales(),
        ordenarPorCodigo(),
        tap(cuentas => {
          this.dataSource = new MatTableDataSource(cuentas);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        })
      )
      .subscribe();
  }

  seleccionar = (entidad: FuenteFinanciemiento) => {
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

  editar(entidad: FuenteFinanciemiento): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: FuenteFinanciemiento): void {
    throw new Error('Method not implemented.');
  }
}
