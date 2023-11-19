import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-tipo-cobertura',
  templateUrl: './plural-tipo-cobertura.component.html',
  styleUrls: ['./plural-tipo-cobertura.component.scss'],
})
export class PluralTipoCoberturaComponent {
  titulo = 'tipos de cobertura';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
