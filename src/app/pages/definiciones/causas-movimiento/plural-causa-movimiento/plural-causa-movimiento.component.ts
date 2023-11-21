import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-causa-movimiento',
  templateUrl: './plural-causa-movimiento.component.html',
  styleUrls: ['./plural-causa-movimiento.component.scss'],
})
export class PluralCausaMovimientoComponent {
  titulo = 'causas de movimiento';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
