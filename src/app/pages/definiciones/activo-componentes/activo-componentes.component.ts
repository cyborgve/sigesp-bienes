import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivoComponente } from '@core/models/activo-componente';

@Component({
  selector: 'app-activo-componentes',
  templateUrl: './activo-componentes.component.html',
  styleUrls: ['./activo-componentes.component.scss'],
})
export class ActivoComponentesComponent {
  titulo = 'Activo Componentes';
  dataSource: MatTableDataSource<ActivoComponente[]> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'denominacion',
    'creado',
    'modificado',
  ];
}
