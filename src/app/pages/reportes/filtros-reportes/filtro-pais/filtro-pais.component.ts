import { tap, take, filter } from 'rxjs/operators';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BuscadorPaisComponent } from '@shared/components/buscador-pais/buscador-pais.component';
import { Pais } from '@core/models/otros-modulos/pais';

@Component({
  selector: 'app-filtro-pais',
  templateUrl: './filtro-pais.component.html',
  styleUrls: ['./filtro-pais.component.scss'],
})
export class FiltroPaisComponent {
  @Input() formulario: FormGroup;
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarPais() {
    let dialog = this._dialog.open(BuscadorPaisComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((pais: Pais) => this.formulario.patchValue({ pais: pais.id })),
        take(1)
      )
      .subscribe();
  }
}
