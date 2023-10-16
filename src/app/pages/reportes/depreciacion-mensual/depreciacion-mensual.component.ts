import { map, tap, take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepreciacionDetalleService } from '@core/services/procesos/depreciacion-detalle.service';
import moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { DetalleDepreciacion } from '@core/models/procesos/detalle-depreciacion';

@Component({
  selector: 'app-depreciacion-mensual',
  templateUrl: './depreciacion-mensual.component.html',
  styleUrls: ['./depreciacion-mensual.component.scss'],
})
export class DepreciacionMensualComponent {
  titulo = 'Reportes: Depreciaciones Mensuales';
  fechaEmision = new Date();
  formularioRangoFechas: FormGroup;
  dataSource: MatTableDataSource<DetalleDepreciacion> =
    new MatTableDataSource();

  constructor(
    private _formBuilder: FormBuilder,
    private _depreciacionDetalle: DepreciacionDetalleService
  ) {
    this.formularioRangoFechas = this._formBuilder.group({
      rango: ['TODOS'],
      fechaInicio: [undefined],
      fechaFin: [undefined],
      fechaReferencia: ['CREADO'],
    });
    this.recargarDatos();
  }

  private recargarDatos() {
    let fechaInicial = this.formularioRangoFechas.value.fechaInicio
      ? this.formularioRangoFechas.value.fechaInicio
      : new Date(1);
    let fechaFinal = this.formularioRangoFechas.value.fechaFin
      ? this.formularioRangoFechas.value.fechaFin
      : new Date();
    let inicio = moment(fechaInicial);
    let fin = moment(fechaFinal);
    this._depreciacionDetalle
      .buscarTodos()
      .pipe(
        map(detalles =>
          detalles.filter(detalle =>
            moment(detalle.fecha).isBetween(inicio, fin)
          )
        ),
        tap(detalles => {
          this.dataSource = new MatTableDataSource(detalles);
        }),
        take(1)
      )
      .subscribe();
  }

  guardar() {}
}
