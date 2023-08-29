import { map, tap, take } from 'rxjs/operators';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { Beneficiario } from '@core/models/otros-modulos/beneficiario';
import { pipe } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BeneficiarioService } from '@core/services/otros-modulos/beneficiario.service';
import { pipeFromArray } from 'rxjs/internal/util/pipe';

const filtroInicial = () =>
  pipe(map((beneficiarios: Beneficiario[]) => beneficiarios));

@Component({
  selector: 'app-buscador-beneficiario',
  templateUrl: './buscador-beneficiario.component.html',
  styleUrls: ['./buscador-beneficiario.component.scss'],
})
export class BuscadorBeneficiarioComponent
  implements TablaEntidad<Beneficiario>, AfterViewInit
{
  titulo = 'buscador de beneficiarios';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['BENEFICIARIOS'];
  dataSource: MatTableDataSource<Beneficiario> = new MatTableDataSource();
  @Input() filtros = [filtroInicial()];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorBeneficiarioComponent>,
    private _location: Location,
    private _router: Router,
    private _proveedor: BeneficiarioService
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._proveedor
      .buscarTodos()
      .pipe(
        pipeFromArray(this.filtros),
        tap(cuentas => {
          this.dataSource = new MatTableDataSource(cuentas);
          this.dataSource.sort = this.matSort;
          this.dataSource.paginator = this.matPaginator;
        }),
        take(1)
      )
      .subscribe();
  }

  seleccionar = (entidad: Beneficiario) => {
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

  editar(entidad: Beneficiario): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Beneficiario): void {
    throw new Error('Method not implemented.');
  }
}
