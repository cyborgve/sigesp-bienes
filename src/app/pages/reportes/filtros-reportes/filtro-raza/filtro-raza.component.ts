import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Raza } from '@core/models/definiciones/raza';
import { BuscadorRazaComponent } from '@pages/definiciones/razas/buscador-raza/buscador-raza.component';

@Component({
  selector: 'app-filtro-raza',
  templateUrl: './filtro-raza.component.html',
  styleUrls: ['./filtro-raza.component.scss'],
})
export class FiltroRazaComponent {
  @Input() formulario: FormGroup;
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
        tap((raza: Raza) => this.formulario.patchValue({ raza: raza.id })),
        take(1)
      )
      .subscribe();
  }
}
