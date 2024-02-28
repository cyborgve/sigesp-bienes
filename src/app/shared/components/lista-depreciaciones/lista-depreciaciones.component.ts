import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ActivoListaDepreciacion } from '@core/models/auxiliares/activo-lista-depreciacion';

@Component({
  selector: 'app-lista-depreciaciones',
  templateUrl: './lista-depreciaciones.component.html',
  styleUrls: ['./lista-depreciaciones.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaDepreciacionesComponent {
  @Input() dataSource: MatTableDataSource<ActivoListaDepreciacion> =
    new MatTableDataSource();
  @Input() columnasVisibles =
    COLUMNAS_VISIBLES.LISTA_DEPRECIACIONES_ANUALES_MENSUALES;
}
