import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Beneficiario } from '@core/models/otros-modulos/beneficiario';
import { BuscadorBeneficiarioComponent } from '@shared/components/buscador-beneficiario/buscador-beneficiario.component';
import { take, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-filtro-beneficiario',
  templateUrl: './filtro-beneficiario.component.html',
  styleUrls: ['./filtro-beneficiario.component.scss'],
})
export class FiltroBeneficiarioComponent {
  @Input() beneficiario = new FormControl(['---']);
  @Input() sinDecorar: boolean = false;

  constructor(private _dialog: MatDialog) {}

  buscarBeneficiario() {
    let dialog = this._dialog.open(BuscadorBeneficiarioComponent, {
      width: '85%',
      height: '95%',
    });
    dialog
      .afterClosed()
      .pipe(
        filter(todo => !!todo),
        tap((beneficiario: Beneficiario) =>
          this.beneficiario.patchValue(beneficiario.id)
        ),
        take(1)
      )
      .subscribe();
  }
}
