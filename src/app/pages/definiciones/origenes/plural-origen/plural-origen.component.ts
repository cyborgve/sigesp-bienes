import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-origen',
  templateUrl: './plural-origen.component.html',
  styleUrls: ['./plural-origen.component.scss'],
})
export class PluralOrigenComponent {
  titulo = 'orígenes';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
