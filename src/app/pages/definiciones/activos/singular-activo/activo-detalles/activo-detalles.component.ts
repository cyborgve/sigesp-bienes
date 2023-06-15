import { map, tap } from 'rxjs/operators';
import { Component, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Basica } from '@core/models/basica';
import { BuscadorUsoComponent } from '@pages/definiciones/usos/buscador-uso/buscador-uso.component';
import { BuscadorTipoSemovienteComponent } from '@pages/definiciones/tipos-semoviente/buscador-tipo-semoviente/buscador-tipo-semoviente.component';
import { BuscadorPropositoSemovienteComponent } from '@pages/definiciones/propositos-semoviente/buscador-proposito-semoviente/buscador-proposito-semoviente.component';
import { BuscadorRazaComponent } from '@pages/definiciones/razas/buscador-raza/buscador-raza.component';
import { MatDialog } from '@angular/material/dialog';
import { TipoActivo } from '@core/types/tipo-activo';
import { BuscadorSedeComponent } from '@pages/definiciones/sedes/buscador-sede/buscador-sede.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activo-detalles',
  templateUrl: './activo-detalles.component.html',
  styleUrls: ['./activo-detalles.component.scss'],
})
export class ActivoDetallesComponent implements OnDestroy {
  private subscripciones: Subscription[] = [];
  @Input() formulario: FormGroup = new FormGroup({});
  @Input() tipoActivo: TipoActivo = 'INMUEBLE';

  constructor(private _dialog: MatDialog) {}

  ngOnDestroy(): void {
    this.subscripciones.forEach(subscripcion => subscripcion.unsubscribe());
  }

  buscarSedeUbicacion() {
    let dialog = this._dialog.open(BuscadorSedeComponent, {
      width: '85%',
      height: '95%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({ sedeUbicacionId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarUso() {
    let dialog = this._dialog.open(BuscadorUsoComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          map(entidad => entidad as Basica),
          tap(entidad => this.formulario.patchValue({ usoId: entidad.id }))
        )
        .subscribe()
    );
  }

  buscarTipoSemoviente() {
    let dialog = this._dialog.open(BuscadorTipoSemovienteComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({ tipoSemovienteId: entidad.id })
          )
        )
        .subscribe()
    );
  }

  buscarPropositoSemoviente() {
    let dialog = this._dialog.open(BuscadorPropositoSemovienteComponent, {
      height: '95%',
      width: '85%',
    });
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          map(entidad => entidad as Basica),
          tap(entidad =>
            this.formulario.patchValue({ propositoSemovienteId: entidad.id })
          )
        )
        .subscribe()
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
    this.subscripciones.push(
      dialog
        .afterClosed()
        .pipe(
          map(entidad => entidad as Basica),
          tap(entidad => this.formulario.patchValue({ razaId: entidad.id }))
        )
        .subscribe()
    );
  }
}
