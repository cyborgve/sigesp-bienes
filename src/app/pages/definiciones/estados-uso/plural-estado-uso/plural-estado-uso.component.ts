import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-estado-uso',
  templateUrl: './plural-estado-uso.component.html',
  styleUrls: ['./plural-estado-uso.component.scss'],
})
export class PluralEstadoUsoComponent {
  titulo = 'estados de uso';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
