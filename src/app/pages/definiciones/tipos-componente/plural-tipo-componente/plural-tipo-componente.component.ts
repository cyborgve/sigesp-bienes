import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-tipo-componente',
  templateUrl: './plural-tipo-componente.component.html',
  styleUrls: ['./plural-tipo-componente.component.scss'],
})
export class PluralTipoComponenteComponent {
  titulo = 'tipos de componente';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
