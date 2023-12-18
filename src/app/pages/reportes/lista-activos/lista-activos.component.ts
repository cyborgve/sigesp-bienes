import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { take, tap, first, map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { RANGOS_FECHAS } from '@core/constants/rangos-fechas';
import { TIPOS_PROCESO } from '@core/constants/tipos-proceso';

import { Activo } from '@core/models/definiciones/activo';
import { convertirObjetoLista } from '@core/utils/funciones/convertir-objeto-lista';
import { convertirCamelCaseATitulo } from '@core/utils/funciones/convertir-camel-case-a-titulo';

import { ActivoService } from '@core/services/definiciones/activo.service';
import { ActivoComponenteService } from '@core/services/definiciones/activo-componente.service';
import { ActivoDetalleService } from '@core/services/definiciones/activo-detalle.service';
import { ActivoDepreciacionService } from '@core/services/definiciones/activo-depreciacion.service';
import { ActivoUbicacionService } from '@core/services/definiciones/activo-ubicacion.service';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { MarcaService } from '@core/services/definiciones/marca.service';
import { ModeloService } from '@core/services/definiciones/modelo.service';
import { SedeService } from '@core/services/definiciones/sede.service';
import { SeguroService } from '@core/services/definiciones/seguro.service';
import { UnidadAdministrativaService } from '@core/services/definiciones/unidad-administrativa.service';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';

import { filtrarActivosPorTipoSede } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-tipo-sede';
import { filtrarActivosPorEstadoUso } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-estado-uso';
import { filtrarActivosPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-fecha';
import { filtrarActivosPorTipo } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-tipo';
import { filtrarActivosPorMarca } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-marca';
import { filtrarActivosPorModelo } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-modelo';
import { filtrarActivosPorMoneda } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-moneda';
import { filtrarActivosPorRotulacion } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-rotulacion';
import { filtrarActivosPorColor } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-color';
import { filtrarActivosPorCategoria } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-categoria';
import { filtrarActivosPorOrigen } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-origen';
import { filtrarActivosPorFuenteFinanciamiento } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-fuente-financiamiento';
import { filtrarActivosPorClase } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-clase';
import { filtrarActivosPorCentroCostos } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-centro-costo';
import { filtrarActivosPorTipoSemoviente } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-tipo-semoviente';
import { filtrarActivosPorTipoAnimal } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-tipo-animal';
import { filtrarActivosPorPropositoSemoviente } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-proposito-semoviente';
import { filtrarActivosPorRaza } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-raza';
import { filtrarActivosPorTipoComponente } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-tipo-componente';
import { filtrarActivosPorMetodoDepreciacion } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-metodo-depreciacion';
import { filtrarActivosPorCuentaContable } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-cuenta-contable';
import { filtrarActivosPorUnidadAdministrativa } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-unidad-administrativa';
import { filtrarActivosPorSede } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-sede';
import { filtrarActivosPorResponsable } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-responsable';
import { filtrarActivosPorEstadoConservacion } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-estado-conservacion';
import { filtrarActivosPorTipoMarca } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-tipo-marca';
import { filtrarActivosPorCategoriaUnidadAdministrativa } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-categoria-unidad-administrativa';
import { filtrarActivosPorCiudad } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-ciudad';
import { filtrarActivosPorPais } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-pais';
import { filtrarActivosPorEstado } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-estado';
import { filtrarActivosPorMunicipio } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-municipio';
import { filtrarActivosPorParroquia } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-parroquia';
import { filtrarActivosPorAseguradora } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-aseguradora';
import { filtrarActivosPorTipoCobertura } from '@core/utils/pipes-rxjs/operadores/filtrar-por-tipo-cobertura';
import { filtrarActivosPorTipoPoliza } from '@core/utils/pipes-rxjs/operadores/filtrar-activos-por-tipo-poliza';

type Chip = { indice: number; nombre: string; valor: string; color: string };

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
  filtrosSinDecorar: boolean = false;
  formularioFiltrosActivos: FormGroup;
  dataSource: MatTableDataSource<Activo> = new MatTableDataSource();
  private readonly propiedadTodos: Chip = {
    indice: -1,
    nombre: 'Todos',
    valor: 'TODOS',
    color: 'none',
  };
  propiedadesDisponibles: Chip[] = [];
  propiedadesSeleccionadas: Chip[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _configuracion: ConfiguracionService,
    private _activo: ActivoService,
    private _activoDetalle: ActivoDetalleService,
    private _activoComponente: ActivoComponenteService,
    private _activoDepreciacion: ActivoDepreciacionService,
    private _activoUbicacion: ActivoUbicacionService,
    private _marca: MarcaService,
    private _modelo: ModeloService,
    private _unidadAdministrativa: UnidadAdministrativaService,
    private _sede: SedeService,
    private _seguro: SeguroService,
    private _xlsx: XLSXService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODOS'],
      fechaInicio: [undefined],
      fechaFin: [undefined],
      fechaReferencia: ['CREADO'],
    });
    this.formularioFiltrosActivos = this._formBuilder.group({
      //* datos generales */
      tipoActivo: ['TODOS'],
      catalogoGeneral: [0],
      marca: [0],
      modelo: [0],
      moneda: ['0'],
      color: [0],
      rotulacion: [0],
      categoria: [0],
      //* detalles */
      origen: [0],
      fuenteFinanciamiento: ['Todos'],
      clase: [0],
      centroCostos: ['Todos'],
      tipoSemoviente: [0],
      propositoSemoviente: [0],
      tipoAnimal: [0],
      raza: [0],
      //* componentes */
      tipoComponente: [0],
      //* depreciacion */
      metodoDepreciacion: ['TODOS'],
      cuentaContable: ['Todos'],
      //* ubicacion */
      unidadAdministrativa: [0],
      sede: [0],
      responsable: ['Todos'],
      estadoUso: [0],
      estadoConservacion: [0],
      //* Otros */
      tipoMarca: [0],
      categoriaUnidadAdministrativa: [0],
      ciudad: ['Todos'],
      estado: ['Todos'],
      municipio: ['Todos'],
      pais: ['Todos'],
      parroquia: ['Todos'],
      aseguradora: [0],
      tipoCobertura: [0],
      tipoPoliza: [0],
      tipoSede: [0],
      tipoUso: [0],
    });
  }

  ngAfterViewInit(): void {
    this.propiedadesSeleccionadas.push(this.propiedadTodos);
    this._configuracion
      .buscarPorId(1)
      .pipe(
        tap(
          configuracion =>
            (this.filtrosSinDecorar =
              configuracion.decorarFiltros === 0 ? true : false)
        ),
        switchMap(() =>
          this._activo.buscarTodosLista().pipe(
            map(activos => activos[0]),
            map(activo => Object.keys(activo)),
            tap(propiedades =>
              propiedades.forEach((propiedad, indice) =>
                this.propiedadesDisponibles.push({
                  indice: indice,
                  nombre: convertirCamelCaseATitulo(propiedad),
                  valor: propiedad,
                  color: `${
                    indice < 16
                      ? 'none'
                      : indice < 62
                      ? 'accent'
                      : indice < 70
                      ? 'warn'
                      : indice < 78
                      ? 'primary'
                      : 'none'
                  }`,
                })
              )
            )
          )
        ),
        take(1)
      )
      .subscribe();
    this.recargarDatos();
    this.subscripciones.push(
      this.formularioRangoFechas.valueChanges.subscribe(() =>
        this.recargarDatos()
      ),
      this.formularioFiltrosActivos.valueChanges.subscribe(() =>
        this.recargarDatos()
      )
    );
  }

  private recargarDatos() {
    this._activo
      .buscarTodos()
      .pipe(
        filtrarActivosPorFecha(this.formularioRangoFechas),
        filtrarActivosPorTipo(this.formularioFiltrosActivos.value.tipoActivo),
        //filtrarActivosPorCatalogoGeneral(this.formularioFiltrosActivos.value.catalogoGeneral),
        filtrarActivosPorMarca(
          this.formularioFiltrosActivos.value.marca,
          this._modelo
        ),
        filtrarActivosPorModelo(this.formularioFiltrosActivos.value.modelo),
        filtrarActivosPorMoneda(this.formularioFiltrosActivos.value.moneda),
        filtrarActivosPorColor(this.formularioFiltrosActivos.value.color),
        filtrarActivosPorRotulacion(
          this.formularioFiltrosActivos.value.categoria
        ),
        filtrarActivosPorCategoria(
          this.formularioFiltrosActivos.value.categoria
        ),
        filtrarActivosPorOrigen(
          this.formularioFiltrosActivos.value.origen,
          this._activoDetalle
        ),
        filtrarActivosPorFuenteFinanciamiento(
          this.formularioFiltrosActivos.value.fuenteFinanciamiento,
          this._activoDetalle
        ),
        filtrarActivosPorClase(
          this.formularioFiltrosActivos.value.clase,
          this._activoDetalle
        ),
        filtrarActivosPorCentroCostos(
          this.formularioFiltrosActivos.value.centroCostos,
          this._activoDetalle
        ),
        filtrarActivosPorTipoSemoviente(
          this.formularioFiltrosActivos.value.tipoSemoviente,
          this._activoDetalle
        ),
        filtrarActivosPorPropositoSemoviente(
          this.formularioFiltrosActivos.value.propositoSemoviente,
          this._activoDetalle
        ),
        filtrarActivosPorTipoAnimal(
          this.formularioFiltrosActivos.value.tipoAnimal,
          this._activoDetalle
        ),
        filtrarActivosPorRaza(
          this.formularioFiltrosActivos.value.raza,
          this._activoDetalle
        ),
        filtrarActivosPorTipoComponente(
          this.formularioFiltrosActivos.value.tipoComponente,
          this._activoComponente
        ),
        filtrarActivosPorMetodoDepreciacion(
          this.formularioFiltrosActivos.value.metodoDepreciacion,
          this._activoDepreciacion
        ),
        filtrarActivosPorCuentaContable(
          this.formularioFiltrosActivos.value.cuentaContable,
          this._activoDepreciacion
        ),
        filtrarActivosPorUnidadAdministrativa(
          this.formularioFiltrosActivos.value.unidadAdministrativa,
          this._activoUbicacion
        ),
        filtrarActivosPorSede(
          this.formularioFiltrosActivos.value.sede,
          this._activoUbicacion
        ),
        filtrarActivosPorResponsable(
          this.formularioFiltrosActivos.value.responsable,
          this._activoUbicacion
        ),
        filtrarActivosPorEstadoUso(
          this.formularioFiltrosActivos.value.estadoUso,
          this._activoUbicacion
        ),
        filtrarActivosPorEstadoConservacion(
          this.formularioFiltrosActivos.value.estadoConservacion,
          this._activoUbicacion
        ),
        filtrarActivosPorTipoMarca(
          this.formularioFiltrosActivos.value.tipoMarca,
          this._marca,
          this._modelo
        ),
        filtrarActivosPorCategoriaUnidadAdministrativa(
          this.formularioFiltrosActivos.value.categoriaUnidadAdministrativa,
          this._unidadAdministrativa,
          this._activoUbicacion
        ),
        filtrarActivosPorPais(
          this.formularioFiltrosActivos.value.pais,
          this._sede,
          this._activoUbicacion
        ),
        filtrarActivosPorEstado(
          this.formularioFiltrosActivos.value.estado,
          this._sede,
          this._activoUbicacion
        ),
        filtrarActivosPorCiudad(
          this.formularioFiltrosActivos.value.ciudad,
          this._sede,
          this._activoUbicacion
        ),
        filtrarActivosPorMunicipio(
          this.formularioFiltrosActivos.value.municipio,
          this._sede,
          this._activoUbicacion
        ),
        filtrarActivosPorParroquia(
          this.formularioFiltrosActivos.value.parroquia,
          this._sede,
          this._activoUbicacion
        ),
        filtrarActivosPorAseguradora(
          this.formularioFiltrosActivos.value.aseguradora,
          this._seguro
        ),
        filtrarActivosPorTipoSede(
          this.formularioFiltrosActivos.value.tipoSede,
          this._sede,
          this._activoUbicacion
        ),
        filtrarActivosPorTipoCobertura(
          this.formularioFiltrosActivos.value.tipoCobertura,
          this._seguro
        ),
        filtrarActivosPorTipoPoliza(
          this.formularioFiltrosActivos.value.tipoPoliza,
          this._seguro
        ),
        tap(activos => {
          this.dataSource = new MatTableDataSource(activos);
        }),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    let activosSeleccionados = this.dataSource.data.map(activo => activo.id);
    let propiedades = this.propiedadesSeleccionadas
      .filter(propiedad => propiedad.indice !== -1)
      .map(propiedad => propiedad.nombre);
    this._activo
      .buscarTodosLista()
      .pipe(
        map(activos =>
          activos.filter(activo => activosSeleccionados.includes(activo.id))
        ),
        map(listaActivos =>
          listaActivos.map(activo => convertirObjetoLista(activo))
        ),
        map(listaActivos =>
          listaActivos.map(activo => {
            if (propiedades.length > 0) {
              let activoModificado: any = {};
              propiedades.forEach(propiedad => {
                activoModificado[propiedad] = activo[propiedad];
              });
              return activoModificado;
            }
            return activo;
          })
        ),
        tap(lista => this._xlsx.listaActivos(lista)),
        first()
      )
      .subscribe();
  }

  soltar(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    else
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    this.ordenarPropiedades();
  }

  ordenarPropiedades = () => {
    this.propiedadesDisponibles =
      this.propiedadesDisponibles.length > 1
        ? this.propiedadesDisponibles
            .sort((a, b) => (a.indice > b.indice ? 1 : -1))
            .filter(propiedad => propiedad.indice !== -1)
        : [this.propiedadTodos];
    this.propiedadesSeleccionadas =
      this.propiedadesSeleccionadas.length > 1
        ? this.propiedadesSeleccionadas.filter(
            propiedad => propiedad.indice !== -1
          )
        : [this.propiedadTodos];
  };

  agregarPropiedad = (propiedad: Chip) => {
    if (propiedad.indice !== -1)
      this.propiedadesDisponibles
        .splice(this.propiedadesDisponibles.indexOf(propiedad), 1)
        .forEach(chip => this.propiedadesSeleccionadas.push(chip));
    this.ordenarPropiedades();
  };

  eliminarPropiedad = (propiedad: Chip) => {
    if (propiedad.indice !== -1)
      this.propiedadesSeleccionadas
        .splice(this.propiedadesSeleccionadas.indexOf(propiedad), 1)
        .forEach(chip => this.propiedadesDisponibles.push(chip));
    this.ordenarPropiedades();
  };
}
