import { Subscription } from 'rxjs';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';
import { FECHAS_CALCULADAS } from '@core/constants/fechas-calculadas';
import { take, tap } from 'rxjs/operators';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { filtrarProcesoPorFecha } from '@core/utils/pipes-rxjs/operadores/filtrar-proceso-por-fecha';
import { ConfiguracionService } from '@core/services/definiciones/configuracion.service';
import { DepreciacionLista } from '@core/models/auxiliares/depreciacion-lista';
import { convertirCamelCaseATitulo } from '@core/utils/funciones/convertir-camel-case-a-titulo';
import { convertirObjetoLista } from '@core/utils/funciones/convertir-objeto-lista';

@Component({
  selector: 'app-lista-depreciaciones',
  templateUrl: './lista-depreciaciones.component.html',
  styleUrls: ['./lista-depreciaciones.component.scss'],
})
export class ListaDepreciacionesComponent implements AfterViewInit, OnDestroy {
  private subscripciones: Subscription[] = [];
  titulo = 'Reportes: Lista de Depreciaciones Registradas';
  fechaEmision = new Date();
  formularioRangoFechas: FormGroup;
  dataSource: MatTableDataSource<DepreciacionLista> = new MatTableDataSource();
  filtrosSinDecorar: boolean = false;

  deshabilitarGuardar = () => this.dataSource.data.length === 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _depreciacion: DepreciacionService,
    private _xlsx: XLSXService,
    private _configuracion: ConfiguracionService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODO EL AÑO'],
      fechaInicio: [FECHAS_CALCULADAS['TODO EL AÑO'][0]],
      fechaFin: [FECHAS_CALCULADAS['TODO EL AÑO'][1]],
      fechaReferencia: 'CREADO',
    });
  }

  ngAfterViewInit(): void {
    this._configuracion
      .buscarPorId(1)
      .pipe(
        tap(
          configuracion =>
            (this.filtrosSinDecorar = configuracion.decorarFiltros === 0)
        ),
        take(1)
      )
      .subscribe();
    this.recargarDepreciaciones();
    this.subscripciones.push(
      this.formularioRangoFechas.valueChanges.subscribe(() =>
        this.recargarDepreciaciones()
      )
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  private recargarDepreciaciones() {
    this._depreciacion
      .buscarTodosLista()
      .pipe(
        filtrarProcesoPorFecha(this.formularioRangoFechas),
        tap(depreciaciones => {
          this.dataSource = new MatTableDataSource(depreciaciones);
        }),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    this._xlsx.listaDepreciaciones(this.dataSource.data);
  }
}
