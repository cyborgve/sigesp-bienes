import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-categoria',
  templateUrl: './plural-categoria.component.html',
  styleUrls: ['./plural-categoria.component.scss'],
})
export class PluralCategoriaComponent {
  titulo = 'categorías';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
