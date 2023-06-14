import { map, tap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Basica } from '@core/models/basica';
import { BuscadorTipoComponenteComponent } from '@pages/definiciones/tipos-componente/buscador-tipo-componente/buscador-tipo-componente.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ComponenteActivo } from '@core/models/componente-activo';
import { COLUMNAS_VISIBLES } from '@core/constants/columnas-visibles';
import { BuscadorComponenteActivoComponent } from '@pages/definiciones/componentes-activo/buscador-componente-activo/buscador-componente-activo.component';

@Component({
  selector: 'app-activo-componentes',
  templateUrl: './activo-componentes.component.html',
  styleUrls: ['./activo-componentes.component.scss'],
})
export class ActivoComponentesComponent {
  @Input() formulario: FormGroup = new FormGroup({});
  dataSource: MatTableDataSource<ComponenteActivo> = new MatTableDataSource();
  columnasVisibles = COLUMNAS_VISIBLES.COMPONENTES_ACTIVO;
  constructor(private _dialog: MatDialog) {}

  agregarComponente() {}

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
    let dialog = this._dialog.open(BuscadorComponenteActivoComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ componenteId: entidad.id })
      )
    );
  }

  editar(entidad: ComponenteActivo) {
    alert('TO-DO');
  }
  eliminar(Entidad: ComponenteActivo) {
    alert('TO-DO');
  }
}
