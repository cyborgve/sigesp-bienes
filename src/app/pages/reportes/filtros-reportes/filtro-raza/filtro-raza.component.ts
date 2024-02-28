import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Raza } from '@core/models/definiciones/raza';
import { BuscadorRazaComponent } from '@pages/definiciones/razas/buscador-raza/buscador-raza.component';
import { puedeActualizarFormulario } from '@core/utils/pipes-rxjs/operadores/puede-actualizar-formulario';

@Component({
  selector: 'app-filtro-raza',
  templateUrl: './filtro-raza.component.html',
  styleUrls: ['./filtro-raza.component.scss'],
})
export class FiltroRazaComponent {
  @Input() formulario: UntypedFormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  reiniciar() {
    this.formulario.patchValue({ raza: 0 });
  }

  buscarRaza() {
    let dialog = this._dialog.open(BuscadorRazaComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        puedeActualizarFormulario(this.formulario.value.raza),
        tap((raza: Raza) => this.formulario.patchValue({ raza: raza.id })),
        take(1)
      )
      .subscribe();
  }
}
