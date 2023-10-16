import { tap, take } from 'rxjs/operators';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Depreciacion } from '@core/models/procesos/depreciacion';
import { DepreciacionService } from '@core/services/procesos/depreciacion.service';
import { XLSXService } from '@core/services/auxiliares/xlsx.service';

@Component({
  selector: 'app-depreciacion',
  templateUrl: './depreciacion.component.html',
  styleUrls: ['./depreciacion.component.scss'],
})
export class DepreciacionComponent {
  titulo = 'Reportes: Depreciación Anual';
  fechaEmision = new Date();
  formularioRangoFechas: FormGroup;
  dataSource: MatTableDataSource<Depreciacion> = new MatTableDataSource();

  constructor(
    private _formBuilder: FormBuilder,
    private _depreciacion: DepreciacionService,
    private _xlsx: XLSXService
  ) {
    this.formularioRangoFechas = _formBuilder.group({
      rango: ['HOY'],
      fechaInicio: [new Date()],
      fechaFin: [undefined],
      fechaReferencia: ['CREADO'],
    });
    this.recargarDepreciaciones();
  }

  private recargarDepreciaciones() {
    this._depreciacion
      .buscarTodos()
      .pipe(
        tap(
          depreciaciones =>
            (this.dataSource = new MatTableDataSource(depreciaciones))
        ),
        take(1)
      )
      .subscribe();
  }

  guardar() {
    this._xlsx.depreciacionesAnuales(this.dataSource.data);
  }
}
