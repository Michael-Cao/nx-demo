import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {init, loadRemote} from '@module-federation/enhanced/runtime';


init({
  name: 'host-app',
  remotes: [
    {
      name: 'workflow',
      entry: 'http://localhost:4201/remoteEntry.js',
    },
  ],
});
loadRemote('workflow/Module');

@Component({
  selector: 'app-settings',
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})
export class SettingsComponent {}
