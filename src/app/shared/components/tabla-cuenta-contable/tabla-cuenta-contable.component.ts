import { Location } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TablaEntidad } from '@core/models/tabla-entidad';
import { first, map, tap } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { ICuentaInstitucional } from 'sigesp/lib/core/interfaces/CuentaInstitucional';

type CuentaContable = Pick<
  ICuentaInstitucional,
  'sc_cuenta' | 'denominacion' | 'cueproacu' | 'referencia'
>;

@Component({
  selector: 'app-tabla-cuenta-contable',
  templateUrl: './tabla-cuenta-contable.component.html',
  styleUrls: ['./tabla-cuenta-contable.component.scss'],
})
export class TablaCuentaContableComponent
  implements TablaEntidad<ICuentaInstitucional>
{
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  columnasVisibles = ['sc_cuenta', 'denominacion', 'cueproacu', 'referencia'];
  @Input() titulo = '';

  dataSource: MatTableDataSource<CuentaContable> = new MatTableDataSource();

  constructor(
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router
  ) {}

  private recargarDatos() {
    this._sigesp
      .getCuentasInstitucionales()
      .pipe(
        first(),
        map(mcuentas =>
          mcuentas.map(
            ci =>
              <CuentaContable>{
                sc_cuenta: ci.cuenta,
                cueproacu: ci.cueproacu,
                denominacion: ci.denominacion,
                referencia: ci.referencia,
              }
          )
        ),
        tap(cuentas => {
          this.dataSource = new MatTableDataSource(cuentas);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        })
      )
      .subscribe();
  }

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

  editar(entidad: ICuentaInstitucional): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: ICuentaInstitucional): void {
    throw new Error('Method not implemented.');
  }
}
