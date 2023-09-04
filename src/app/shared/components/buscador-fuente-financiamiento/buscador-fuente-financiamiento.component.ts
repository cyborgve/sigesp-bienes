import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { FuenteFinanciamiento } from '@core/models/otros-modulos/fuente-financiamiento';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { first, tap, map } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { adaptarFuentesFinanciamiento } from '@core/utils/adaptadores-rxjs.ts/adaptar-fuentes-financiamiento';
import { filtrarValoresIniciales } from '@core/utils/operadores-rxjs/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/operadores-rxjs/ordenar-por-codigo';
import { pipe } from 'rxjs';

const filtroInicial = () =>
  pipe(map((fuentes: FuenteFinanciamiento[]) => fuentes));

@Component({
  selector: 'app-buscador-fuente-financiamiento',
  templateUrl: './buscador-fuente-financiamiento.component.html',
  styleUrls: ['./buscador-fuente-financiamiento.component.scss'],
})
export class BuscadorFuenteFinanciamientoComponent
  implements TablaEntidad<FuenteFinanciamiento>, AfterViewInit
{
  titulo = 'buscador de fuentes de financiamiento';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['FUENTES_FINANCIEMIENTO'];
  dataSource: MatTableDataSource<FuenteFinanciamiento> =
    new MatTableDataSource();
  @Input() filtros = [filtroInicial()];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorFuenteFinanciamientoComponent>,
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
        adaptarFuentesFinanciamiento(),
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

  seleccionar = (entidad: FuenteFinanciamiento) => {
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

  editar(entidad: FuenteFinanciamiento): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: FuenteFinanciamiento): void {
    throw new Error('Method not implemented.');
  }
}
