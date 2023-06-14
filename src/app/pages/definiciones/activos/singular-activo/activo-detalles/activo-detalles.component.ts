import { map, tap } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Basica } from '@core/models/basica';
import { BuscadorUsoComponent } from '@pages/definiciones/usos/buscador-uso/buscador-uso.component';
import { BuscadorTipoSemovienteComponent } from '@pages/definiciones/tipos-semoviente/buscador-tipo-semoviente/buscador-tipo-semoviente.component';
import { BuscadorPropositoSemovienteComponent } from '@pages/definiciones/propositos-semoviente/buscador-proposito-semoviente/buscador-proposito-semoviente.component';
import { BuscadorRazaComponent } from '@pages/definiciones/razas/buscador-raza/buscador-raza.component';
import { MatDialog } from '@angular/material/dialog';
import { TipoActivo } from '@core/types/tipo-activo';

@Component({
  selector: 'app-activo-detalles',
  templateUrl: './activo-detalles.component.html',
  styleUrls: ['./activo-detalles.component.scss'],
})
export class ActivoDetallesComponent {
  @Input() formulario: FormGroup = new FormGroup({});
  @Input() tipoActivo: TipoActivo = 'INMUEBLE';

  constructor(private _dialog: MatDialog) {}

  ocultarInmueble = () => {
    if (this.tipoActivo === 'INMUEBLE') return false;
    return true;
  };
  ocultarVehiculo = () => {
    if (this.tipoActivo === 'VEHICULO') return false;
    return true;
  };
  ocultarSemoviente = () => {
    if (this.tipoActivo === 'SEMOVIENTE') return false;
    return true;
  };

  buscarSedeUbicacion() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }

  buscarUso() {
    let dialog = this._dialog.open(BuscadorUsoComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ usoId: entidad.id })
      )
    );
  }

  buscarTipoSemoviente() {
    let dialog = this._dialog.open(BuscadorTipoSemovienteComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ tipoSemovienteId: entidad.id })
      )
    );
  }

  buscarPropositoSemoviente() {
    let dialog = this._dialog.open(BuscadorPropositoSemovienteComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ propositoSemovienteId: entidad.id })
      )
    );
  }

  buscarUnidadMedida() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }

  buscarTipoAnimal() {
    TODO: 'preguntar de donde se obtienen estos datos';
    alert('TO-DO');
  }

  buscarRaza() {
    let dialog = this._dialog.open(BuscadorRazaComponent, {
      height: '95%',
      width: '85%',
    });
    dialog.afterClosed().pipe(
      map(entidad => entidad as Basica),
      tap((entidad: Basica) =>
        this.formulario.patchValue({ razaId: entidad.id })
      )
    );
  }
}
