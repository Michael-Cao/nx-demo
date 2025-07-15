import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { SohoAccordionModule, SohoButtonModule, SohoIconModule } from 'ids-enterprise-ng';

@Component({
  selector: 'app-nav',
  imports: [
    RouterLink,
    CommonModule,
    SohoAccordionModule,
    SohoButtonModule,
    SohoIconModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {

  constructor(
    private router: Router,
  ) {

  }

  ngOnInit(): void {
  }


  get appLink(): string[] {
    return ['pipeline']
  }

  onClickLink($event: any) {
    this.router.navigate([$event]);
    console.info($event);
  }

  onClickAbout() {
  }

  onClickHelp() {
  }
}
