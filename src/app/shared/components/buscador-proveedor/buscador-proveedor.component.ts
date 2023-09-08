import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { TablaEntidad } from '@core/models/auxiliares/tabla-entidad';
import { Proveedor } from '@core/models/otros-modulos/proveedor';
import { filtrarValoresIniciales } from '@core/utils/operadores-rxjs/filtrar-valores-iniciales';
import { ordenarPorCodigo } from '@core/utils/operadores-rxjs/ordenar-por-codigo';
import { first, tap, map } from 'rxjs/operators';
import { SigespService } from 'sigesp';
import { pipe } from 'rxjs';
import { ProveedorService } from '@core/services/otros-modulos/proveedor.service';

const filtroInicial = () =>
  pipe(map((proveedores: Proveedor[]) => proveedores));

@Component({
  selector: 'app-buscador-proveedor',
  templateUrl: './buscador-proveedor.component.html',
  styleUrls: ['./buscador-proveedor.component.scss'],
})
export class BuscadorProveedorComponent
  implements TablaEntidad<Proveedor>, AfterViewInit
{
  titulo = 'buscador de proveedores';
  @ViewChild(MatSort) matSort: MatSort;
  @ViewChild(MatPaginator) matPaginator: MatPaginator;
  ocultarNuevo = true;
  columnasVisibles = COLUMNAS_VISIBLES['PROVEEDORES'];
  dataSource: MatTableDataSource<Proveedor> = new MatTableDataSource();
  @Input() filtros = [filtroInicial()];

  constructor(
    private _dialogRef: MatDialogRef<BuscadorProveedorComponent>,
    private _sigesp: SigespService,
    private _location: Location,
    private _router: Router,
    private _proveedor: ProveedorService
  ) {}

  ngAfterViewInit(): void {
    this.recargarDatos();
  }

  private recargarDatos() {
    this._proveedor
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

  seleccionar = (entidad: Proveedor) => {
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

  editar(entidad: Proveedor): void {
    throw new Error('Method not implemented.');
  }

  eliminar(entidad: Proveedor): void {
    throw new Error('Method not implemented.');
  }
}