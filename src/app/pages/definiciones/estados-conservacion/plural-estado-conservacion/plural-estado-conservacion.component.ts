import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-estado-conservacion',
  templateUrl: './plural-estado-conservacion.component.html',
  styleUrls: ['./plural-estado-conservacion.component.scss'],
})
export class PluralEstadoConservacionComponent {
  titulo = 'estados de conservación';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
