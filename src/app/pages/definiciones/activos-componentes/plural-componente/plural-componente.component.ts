import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-componente',
  templateUrl: './plural-componente.component.html',
  styleUrls: ['./plural-componente.component.scss'],
})
export class PluralComponenteComponent {
  titulo = 'Componentes';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
