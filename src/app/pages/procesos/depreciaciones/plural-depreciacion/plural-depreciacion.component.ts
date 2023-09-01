import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-depreciacion',
  templateUrl: './plural-depreciacion.component.html',
  styleUrls: ['./plural-depreciacion.component.scss'],
})
export class PluralDepreciacionComponent {
  titulo = 'depreciaciones';
  constructor(private _router: Router, private _location: Location) {}

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/procesos']);
}
