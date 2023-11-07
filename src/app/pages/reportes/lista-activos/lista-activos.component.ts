import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';
import { Activo } from '@core/models/definiciones/activo';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { ActivoService } from '@core/services/definiciones/activo.service';
import { filtrarActivosPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-fecha';
import { take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { filtrarActivosPorTipo } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-tipo';
import { filtrarActivosPorCatalogoGeneral } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-catalogo-general';

@Component({
  selector: 'app-lista-activos',
  templateUrl: './lista-activos.component.html',
  styleUrls: ['./lista-activos.component.scss'],
})
export class ListaActivosComponent implements AfterViewInit {
  private subscripciones: Subscription[] = [];
  titulo = 'Reportes: Lista de Bienes';
  fechaEmision = new Date();
  rangosFechas = RANGOS_FECHAS;
  formularioRangoFechas: FormGroup;
  procesos = TIPOS_PROCESO;
  columnasVisibles = COLUMNAS_VISIBLES['ACTIVOS'].filter(c => c !== 'acciones');
  filtrosSinDecorar = false;
  formularioFiltrosActivos: FormGroup;
  dataSource: MatTableDataSource<Activo> = new MatTableDataSource();

  // este activo se utiliza para definir
  // las propiedades a seleccionar
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
      // datos generales
      tipoActivo: ['TODOS'],
      catalogoGeneral: [0],
      marca: [0],
      modelo: [0],
      moneda: [0],
      color: [0],
      rotulacion: [0],
      categoria: [0],
      // detalles
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

  ngAfterViewInit(): void {
    this.recargarDatos();
    this.subscripciones.push(
      this.formularioRangoFechas.valueChanges.subscribe(() =>
        this.recargarDatos()
      )
    );
    this.formularioFiltrosActivos.valueChanges.subscribe(() =>
      this.recargarDatos()
    );
  }

  private recargarDatos() {
    this._activo
      .buscarTodos()
      .pipe(
        filtrarActivosPorFecha(this.formularioRangoFechas),
        filtrarActivosPorTipo(this.formularioFiltrosActivos.value.tipoActivo),
        // TODO: filtrarActivosPorCatalogoGeneral(this.formularioFiltrosActivos.value.catalogoGeneral),
        tap(activos => {
          this.dataSource = new MatTableDataSource(activos);
        }),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    this._xlsx.listaActivos(this.dataSource.data);
  }
}
