import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-rotulacion',
  templateUrl: './plural-rotulacion.component.html',
  styleUrls: ['./plural-rotulacion.component.scss'],
})
export class PluralRotulacionComponent {
  titulo = 'rotulaciones';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
