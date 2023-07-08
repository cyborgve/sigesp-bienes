import { map, tap } from 'rxjs/operators';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Basica } from '@core/models/auxiliares/basica';
import { BuscadorTipoComponenteComponent } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { Subscription } from 'rxjs';
import { Componente } from '@core/models/componente';

@Component({
  selector: 'app-activo-componentes',
  templateUrl: './activo-componentes.component.html',
  styleUrls: ['./activo-componentes.component.scss'],
})
export class ActivoComponentesComponent implements OnDestroy {
  subscripciones: Subscription[] = [];
  @Input() formulario: FormGroup = new FormGroup({});
  dataSource: MatTableDataSource<Componente> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES;

  constructor(private _dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  agregarComponente() {
    alert('TODO');
  }

  buscarTipoComponente() {
    let dialog = this._dialog.open(BuscadorTipoComponenteComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ tipoComponenteId: entidad.id })
      )
    );
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
