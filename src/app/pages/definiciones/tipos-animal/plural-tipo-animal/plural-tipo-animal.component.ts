import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-tipo-animal',
  templateUrl: './plural-tipo-animal.component.html',
  styleUrls: ['./plural-tipo-animal.component.scss'],
})
export class PluralTipoAnimalComponent {
  titulo = 'tipos de animal';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
