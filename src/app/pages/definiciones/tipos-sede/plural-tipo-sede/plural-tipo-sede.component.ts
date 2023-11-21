import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-tipo-sede',
  templateUrl: './plural-tipo-sede.component.html',
  styleUrls: ['./plural-tipo-sede.component.scss'],
})
export class PluralTipoSedeComponent {
  titulo = 'tipos de sede';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
