import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';
import { Activo } from '@core/models/definiciones/activo';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-listado-activos',
  templateUrl: './listado-activos.component.html',
  styleUrls: ['./listado-activos.component.scss'],
})
export class ListadoActivosComponent implements OnInit {
  titulo = 'Reportes: Listado de Bienes';
  fechaEmision = new Date();
  rangosFechas = RANGOS_FECHAS;
  formularioRangoFechas: FormGroup;
  procesos = TIPOS_PROCESO;
  columnasVisibles = COLUMNAS_VISIBLES['ACTIVOS'].filter(c => c !== 'acciones');
  filtrosSinDecorar = false;
  formularioFiltrosActivos: FormGroup;
  dataSource: MatTableDataSource<Activo> = new MatTableDataSource();

  activo = <Activo>{};

  constructor(
    private _formBuilder: FormBuilder,
    private _activo: ActivoService,
    private _xlsx: XLSXService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODOS'],
      fechaInicio: [undefined],
      fechaFin: [undefined],
      fechaReferencia: ['CREADO'],
    });
    this.formularioFiltrosActivos = this._formBuilder.group({
      tipoActivo: [undefined],
      catalogoGeneral: [undefined],
      marca: [undefined],
      modelo: [undefined],
      moneda: [undefined],
      color: [undefined],
      rotulacion: [undefined],
      categoria: [undefined],
      origen: [undefined],
      fuenteFinanciamiento: [undefined],
      clase: [undefined],
      centroCostos: [undefined],
      tipoComponente: [undefined],
      metodoDepreciacion: [undefined],
      cuentaContable: [undefined],
      unidadAdministrativa: [undefined],
      sede: [undefined],
      responsable: [undefined],
      estadoUso: [undefined],
      estadoConservacion: [undefined],
      /* otros */
      beneficiario: [undefined],
      tipoMarca: [undefined],
      categoriaUnidadAdministrativa: [undefined],
      pais: [undefined],
      estado: [undefined],
      ciudad: [undefined],
      municipio: [undefined],
      parroquia: [undefined],
      proveedor: [undefined],
      seguro: [undefined],
      tipoCobertura: [undefined],
      tipoPoliza: [undefined],
      tipoSede: [undefined],
      tipoUso: [undefined],
    });
  }

  ngOnInit(): void {
    this._activo
      .buscarTodos()
      .pipe(
        tap(activos => (this.dataSource = new MatTableDataSource(activos))),
        switchMap(activos => this._activo.buscarPorId(0)),
        tap(activo => (this.activo = activo)),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    this._xlsx.listaActivos(this.dataSource.data);
  }
}
