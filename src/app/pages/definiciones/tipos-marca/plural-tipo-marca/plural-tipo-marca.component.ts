import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-tipo-marca',
  templateUrl: './plural-tipo-marca.component.html',
  styleUrls: ['./plural-tipo-marca.component.scss'],
})
export class PluralTipoMarcaComponent {
  titulo = 'tipos de marca';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
