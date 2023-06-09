import { map, tap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Basica } from '@core/models/basica';
import { BuscadorResponsableComponent } from '@pages/definiciones/responsables/buscador-responsable/buscador-responsable.component';
import { BuscadorEstadoUsoComponent } from '@pages/definiciones/estados-uso/buscador-estado-uso/buscador-estado-uso.component';
import { BuscadorEstadoConservacionComponent } from '@pages/definiciones/estados-conservacion/buscador-estado-conservacion/buscador-estado-conservacion.component';

@Component({
  selector: 'app-activo-responsable',
  templateUrl: './activo-responsable.component.html',
  styleUrls: ['./activo-responsable.component.scss'],
})
export class ActivoResponsableComponent {
  @Input() formulario: FormGroup = new FormGroup({});

  constructor(private _dialog: MatDialog) {}

  buscarResponsable() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ responsableId: entidad.id })
      )
    );
  }

  buscarResponsableUso() {
    let dialog = this._dialog.open(BuscadorResponsableComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ responsableUsoId: entidad.id })
      )
    );
  }

  buscarEstadoConservacion() {
    let dialog = this._dialog.open(BuscadorEstadoConservacionComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ conservacion: entidad.id })
      )
    );
  }

  buscarEstadoUso() {
    let dialog = this._dialog.open(BuscadorEstadoUsoComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ estadoUsoId: entidad.id })
      )
    );
  }
}
