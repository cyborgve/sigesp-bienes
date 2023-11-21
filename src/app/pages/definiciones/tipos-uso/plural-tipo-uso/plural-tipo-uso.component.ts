import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-tipo-uso',
  templateUrl: './plural-tipo-uso.component.html',
  styleUrls: ['./plural-tipo-uso.component.scss'],
})
export class PluralTipoUsoComponent {
  titulo = 'tipos de uso';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
