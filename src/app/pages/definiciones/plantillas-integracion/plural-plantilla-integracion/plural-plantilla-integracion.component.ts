import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-plantilla-integracion',
  templateUrl: './plural-plantilla-integracion.component.html',
  styleUrls: ['./plural-plantilla-integracion.component.scss'],
})
export class PluralPlantillaIntegracionComponent {
  titulo = 'plantillas de integración';

  constructor(private _location: Location, private _router: Router) {}

  irAtras = () => this._location.back();
  irAlInicio = () => this._router.navigate(['/']);
}
