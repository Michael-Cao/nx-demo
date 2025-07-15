import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';


import { SohoIconModule, SohoModuleNavComponent, SohoModuleNavContainerComponent, SohoModuleNavContainerModule, SohoModuleNavModule, SohoModuleNavSwitcherComponent } from 'ids-enterprise-ng';
import { NavComponent } from './nav/nav.component';
import { HeaderComponent } from './header/header.component';


@Component({
  imports: [
    CommonModule,
    RouterModule,
    SohoIconModule,
    SohoModuleNavContainerModule,
    SohoModuleNavModule,
    HeaderComponent,
    NavComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild(SohoModuleNavSwitcherComponent) moduleNavSwitcher?: SohoModuleNavSwitcherComponent;
  @ViewChild(SohoModuleNavContainerComponent) moduleNavContainer?: SohoModuleNavContainerComponent;
  @ViewChild(SohoModuleNavComponent, { static: true })

  public moduleNav!: SohoModuleNavComponent;

  protected title = 'host-app';

  public model = {
    displayMode: <SohoModuleNavModule>'collapsed',
    selectedRole: 'admin',
    // roles: defaultRoles
  }


  toggleModuleNavDisplayMode(e: MouseEvent) {
    console.info(">>>>", e);
    if (!this.moduleNavContainer) return;
    console.info(">>>>--------------", this.moduleNavContainer);
    const isCurrentlyCollapsed = this.model.displayMode === 'collapsed';
    this.model.displayMode = isCurrentlyCollapsed ? 'expanded' : 'collapsed';
  }

}
