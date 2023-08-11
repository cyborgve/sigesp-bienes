import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { ActivoComponente } from '@core/models/definiciones/activo-componente';

@Component({
  selector: 'app-activo-componentes',
  templateUrl: './activo-componentes.component.html',
  styleUrls: ['./activo-componentes.component.scss'],
})
export class ActivoComponentesComponent implements AfterViewInit {
  @Input() formulario: FormGroup = new FormGroup({});
  dataSource: MatTableDataSource<ActivoComponente> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES.filter(
    c => c !== 'acciones'
  );

  ngAfterViewInit(): void {
    this.formulario.valueChanges.subscribe(
      () =>
        (this.dataSource = new MatTableDataSource(
          this.formulario.value.componentes as ActivoComponente[]
        ))
    );
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
