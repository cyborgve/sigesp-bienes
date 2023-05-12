import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botones-definiciones',
  templateUrl: './botones-definiciones.component.html',
  styleUrls: ['./botones-definiciones.component.scss'],
})
export class BotonesDefinicionesComponent {
  constructor(private _location: Location, private _router: Router) {}
  irAlInicio = () => this._router.navigate(['/']);
  irAtras = () => this._location.back();
}
