import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activo-componentes',
  templateUrl: './activo-componentes.component.html',
  styleUrls: ['./activo-componentes.component.scss'],
})
export class ActivoComponentesComponent implements AfterViewInit, OnDestroy {
  subscripciones: Subscription[] = [];
  @Input() formulario: FormGroup = new FormGroup({});
  dataSource: MatTableDataSource<ActivoComponente> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES.filter(
    c => c !== 'acciones'
  );

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(
      this.formulario.value.componentes as ActivoComponente[]
    );
  }

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  agregarComponente() {
    alert('TODO');
  }

  buscarComponenteActivo() {
    alert('TODO');
  }

  editar(entidad: ActivoComponente) {
    alert('TO-DO');
  }
  eliminar(Entidad: ActivoComponente) {
    alert('TO-DO');
  }
}
