import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { BuscadorTipoAnimalComponent } from '@pages/definiciones/tipos-animal/buscador-tipo-animal/buscador-tipo-animal.component';
import { TipoAnimal } from '@core/models/definiciones/tipo-animal';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-tipo-animal',
  templateUrl: './filtro-tipo-animal.component.html',
  styleUrls: ['./filtro-tipo-animal.component.scss'],
})
export class FiltroTipoAnimalComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ tipoAnimal: 0 });
  }

  buscarTipoAnimal() {
    let dialog = this._dialog.open(BuscadorTipoAnimalComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.tipoAnimal),
        tap((tipoAnimal: TipoAnimal) =>
          this.formulario.patchValue({ tipoAnimal: tipoAnimal.id })
        ),
        take(1)
      )
      .subscribe();
  }
}
