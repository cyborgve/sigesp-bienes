import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent {
  @Input() columnasVisibles = [
    'comprobante',
    'unidadAdministrativaCedente',
    'unidadAdministrativaReceptora',
    'creado',
  ];
  @Input() dataSource: MatTableDataSource<ActaPrestamo> =
    new MatTableDataSource();
}
