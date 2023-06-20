import { Location } from '@angular/common';
import {
  Component,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  EventEmitter,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TablaEntidad } from '@core/models/tabla-entidad';
import { CuentaContable } from '@core/types/cuenta-contable';
import { first, map, tap } from 'rxjs/operators';
import { MCuentaInstitucional, SigespService } from 'sigesp';

@Component({
  selector: 'app-tabla-cuenta-contable',
  templateUrl: './tabla-cuenta-contable.component.html',
  styleUrls: ['./tabla-cuenta-contable.component.scss'],
})
export class TablaCuentaContableComponent
  implements TablaEntidad<CuentaContable>, AfterViewInit
{
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  columnasVisibles = ['cuenta', 'denominacion', 'cueproacu', 'referencia'];
  @Input() titulo = '';
  @Output() dobleClick = new EventEmitter();
  cuentaInst: MCuentaInstitucional;

  dataSource: MatTableDataSource<CuentaContable> = new MatTableDataSource();

  constructor(
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._sigesp
      .getCuentasInstitucionales()
      .pipe(
        first(),
        map(ci => ci as CuentaContable[]),
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

  editar(entidad: CuentaContable): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: CuentaContable): void {
    throw new Error('Method not implemented.');
  }
}
