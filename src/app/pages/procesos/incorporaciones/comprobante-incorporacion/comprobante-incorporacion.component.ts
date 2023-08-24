import { tap, take, switchMap, map } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { Empresa } from '@core/models/otros-modulos/empresa';
import { EmpresaService } from '@core/services/otros-modulos/empresa.service';
import { Incorporacion } from '@core/models/procesos/incorporacion';
import { TipoProceso } from '@core/types/tipo-proceso';
import { Id } from '@core/types/id';
import { IncorporacionService } from '@core/services/procesos/incorporacion.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoProceso } from '@core/models/auxiliares/activo-proceso';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';

@Component({
  selector: 'app-comprobante-incorporacion',
  templateUrl: './comprobante-incorporacion.component.html',
  styleUrls: ['./comprobante-incorporacion.component.scss'],
})
export class ComprobanteIncorporacionComponent {
  @Input() id: Id;
  @Input() proceso: Incorporacion;
  @Input() tipoProceso: TipoProceso = 'INCORPORACIÓN';
  empresa: Empresa = <Empresa>{};
  dataSource: MatTableDataSource<ActivoProceso> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES['ACTIVOS'].filter(c => c !== 'acciones');

  constructor(
    private _empresa: EmpresaService,
    private _incorporacion: IncorporacionService
  ) {
    this._empresa
      .datosGeneralesTodasLasEmpresas()
      .pipe(
        map(empresas => empresas[0]),
        tap(empresa => (this.empresa = empresa)),
        switchMap(() => this._incorporacion.buscarPorId(this.id)),
        tap(incorporacion => (this.proceso = incorporacion)),
        tap(inc => (this.dataSource = new MatTableDataSource(inc.activos))),
        take(1)
      )
      .subscribe();
  }
}
