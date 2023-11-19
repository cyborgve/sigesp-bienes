import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-tipo-poliza',
  templateUrl: './plural-tipo-poliza.component.html',
  styleUrls: ['./plural-tipo-poliza.component.scss'],
})
export class PluralTipoPolizaComponent {
  titulo = 'tipos de poliza';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
