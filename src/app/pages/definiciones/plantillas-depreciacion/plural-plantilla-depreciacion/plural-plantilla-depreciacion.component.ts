import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-plantilla-depreciacion',
  templateUrl: './plural-plantilla-depreciacion.component.html',
  styleUrls: ['./plural-plantilla-depreciacion.component.scss'],
})
export class PluralPlantillaDepreciacionComponent {
  titulo = 'plantillas depreciación';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
