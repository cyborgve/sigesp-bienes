import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { Moneda } from '@core/models/otros-modulos/moneda';
import { adaptarMonedas } from '@core/utils/adaptadores-rxjs.ts/adaptar-monedas';
import { filtrarValoresIniciales } from '@core/utils/operadores-rxjs/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/operadores-rxjs/ordenar-por-codigo';
import { first, tap, map } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { pipe } from 'rxjs';
import { MonedaService } from '@core/services/otros-modulos/moneda.service';

const filtroInicial = () => pipe(map((monedas: Moneda[]) => monedas));

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
  columnasVisibles = COLUMNAS_VISIBLES['MONEDAS'];
  dataSource: MatTableDataSource<Moneda> = new MatTableDataSource();
  @Input() filtros = [filtroInicial()];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorMonedaComponent>,
    private _location: Location,
    private _router: Router,
    private _moneda: MonedaService
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._moneda
      .buscarTodos()
      .pipe(
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
