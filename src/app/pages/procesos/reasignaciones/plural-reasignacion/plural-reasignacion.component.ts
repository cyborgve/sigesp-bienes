import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-reasignacion',
  templateUrl: './plural-reasignacion.component.html',
  styleUrls: ['./plural-reasignacion.component.scss'],
})
export class PluralReasignacionComponent {
  titulo = 'reasignaciones';
  constructor(private _router: Router, private _location: Location) {}

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/procesos']);
}
