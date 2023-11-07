import { tap, take } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { LineEnterprise } from '@core/models/otros-modulos/line-enterprise';
import { LineEnterpriseService } from '@core/services/otros-modulos/line-enterprise.service';
import { adaptarLinesEnterprise } from '@core/utils/pipes-rxjs/adaptadores/adaptar-lines-enterprise';
import { filtrarValoresIniciales } from '@core/utils/pipes-rxjs/operadores/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/pipes-rxjs/operadores/ordenar-por-codigo';

@Component({
  selector: 'app-buscador-line-enterprise',
  templateUrl: './buscador-line-enterprise.component.html',
  styleUrls: ['./buscador-line-enterprise.component.scss'],
})
export class BuscadorLineEnterpriseComponent
  implements TablaEntidad<LineEnterprise>, AfterViewInit
{
  titulo = 'buscador de line enterprise';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = [];
  dataSource: MatTableDataSource<LineEnterprise> = new MatTableDataSource();

  constructor(
    private _dialogRef: MatDialogRef<BuscadorLineEnterpriseComponent>,
    private _lineEnterprise: LineEnterpriseService,
    private _location: Location,
    private _router: Router
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._lineEnterprise
      .buscarTodos()
      .pipe(
        adaptarLinesEnterprise(),
        filtrarValoresIniciales(),
        ordenarPorCodigo(),
        tap(cuentas => {
          this.dataSource = new MatTableDataSource(cuentas);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        }),
        take(1)
      )
      .subscribe();
  }

  seleccionar = (entidad: LineEnterprise) => {
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

  editar(entidad: LineEnterprise): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: LineEnterprise): void {
    throw new Error('Method not implemented.');
  }
}
