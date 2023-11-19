import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-correlativo',
  templateUrl: './plural-correlativo.component.html',
  styleUrls: ['./plural-correlativo.component.scss'],
})
export class PluralCorrelativoComponent {
  titulo = 'correlativos';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
