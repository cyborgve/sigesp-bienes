import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-proposito-semoviente',
  templateUrl: './plural-proposito-semoviente.component.html',
  styleUrls: ['./plural-proposito-semoviente.component.scss'],
})
export class PluralPropositoSemovienteComponent {
  titulo = 'propósitos semoviente';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
