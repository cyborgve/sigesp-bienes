import {
  Component,
  Input,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActaPrestamo } from '@core/models/procesos/acta-prestamo';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalleComponent implements AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() columnasVisibles = [
    'comprobante',
    'unidadAdministrativaCedente',
    'unidadAdministrativaReceptora',
    'creado',
  ];
  @Input() dataSource: MatTableDataSource<ActaPrestamo>;

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
