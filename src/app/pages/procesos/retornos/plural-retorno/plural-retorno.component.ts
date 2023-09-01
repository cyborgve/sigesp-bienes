import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plural-retorno',
  templateUrl: './plural-retorno.component.html',
  styleUrls: ['./plural-retorno.component.scss'],
})
export class PluralRetornoComponent {
  titulo = 'retornos';
  constructor(private _router: Router, private _location: Location) {}

  irAtras = () => this._location.back();

  irAlInicio = () => this._router.navigate(['/procesos']);
}
