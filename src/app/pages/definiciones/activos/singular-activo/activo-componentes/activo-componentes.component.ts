import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Subscription } from 'rxjs';
import { Componente } from '@core/models/componente';

@Component({
  selector: 'app-activo-componentes',
  templateUrl: './activo-componentes.component.html',
  styleUrls: ['./activo-componentes.component.scss'],
})
export class ActivoComponentesComponent implements AfterViewInit, OnDestroy {
  subscripciones: Subscription[] = [];
  @Input() formulario: FormGroup = new FormGroup({});
  dataSource: MatTableDataSource<Componente> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES.filter(
    c => c !== 'acciones'
  );

  ngAfterViewInit(): void {
    this.dataSource = new MatTableDataSource(
      this.formulario.value.componentes as Componente[]
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

  editar(entidad: Componente) {
    alert('TO-DO');
  }
  eliminar(Entidad: Componente) {
    alert('TO-DO');
  }
}
