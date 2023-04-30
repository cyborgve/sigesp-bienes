import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app/app.component';

@Component({
  selector: 'app-close',
  templateUrl: './close.component.html',
  styleUrls: ['./close.component.scss']
})
export class CloseComponent implements OnInit {

  constructor(private _app: AppComponent) { }

  ngOnInit() {
    this._app.usuario = null;
    sessionStorage.clear();
    localStorage.clear();
    window.close()
  }

}
