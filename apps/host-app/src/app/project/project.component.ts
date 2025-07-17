import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {init, loadRemote} from '@module-federation/enhanced/runtime';


init({
  name: 'host-app',
  remotes: [
    {
      name: 'karavan',
      entry: 'http://localhost:4202/remoteEntry.js',
    },
  ],
});
loadRemote('karavan/Module');

@Component({
  selector: 'app-project',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {}
