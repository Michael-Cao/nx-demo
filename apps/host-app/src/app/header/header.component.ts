import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SohoButtonModule, SohoHeaderModule, SohoMenuButtonModule, SohoPopupMenuModule, SohoToolbarFlexComponent, SohoToolbarFlexModule } from 'ids-enterprise-ng';
import { HeaderButtonOptions, HeaderToolbarOptions } from './header.model';
import { Router } from '@angular/router';
import { HeaderRefService } from './header-dynamic-ref.service';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    SohoHeaderModule,
    SohoButtonModule,
    SohoMenuButtonModule,
    SohoPopupMenuModule,
    SohoToolbarFlexModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @HostBinding('class.header') get isHeader() { return true; }
  @HostBinding('class.is-personalizable') get isPersonalizable() { return true; }

  @ViewChild("appHeaderToolbar", { static: true }) toolbarComponent?: SohoToolbarFlexComponent;

  pageTitle = "";


  /**
  * Sets the header toolbar using TabOptions
  */
  @Input() set toolbarOptions(options: HeaderToolbarOptions | undefined) {
    if (options && options.toolbarButtons) {
      options.toolbarButtons.forEach(button => {
        if (button.istoggle) {
          this.initToggleButton(button);
        }
      });
    }
    this.currentToolbarOptions = options;
  }

  /**
   * Get the current toolbar options.
   */
  get toolbarOptions(): HeaderToolbarOptions | undefined {
    return this.currentToolbarOptions;
  }

  @Output() hamburgerClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() toolbarButtonClick: EventEmitter<any> = new EventEmitter<any>();

  public currentToolbarOptions?: HeaderToolbarOptions = undefined;

  constructor(
    private headerRef: HeaderRefService,
    private changeDetector: ChangeDetectorRef,
    private titleService: TitleService,
    public router: Router,) {
    this.headerRef.instance = this;
    console.info(this.headerRef);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.titleService.Title.subscribe({
      next: data => {
        this.pageTitle = data;
        this.changeDetector.detectChanges();
      }
    });

    this.toolbarComponent?.selected.subscribe({
      next: (data: any) => {
        console.info(data);
        this.changeDetector.detectChanges();
      }
    })
  }

  onSelected($event: any) {
    console.info($event)
  }

  onButtonClicked(button: any) {
    this.toolbarButtonClick.next(button);
  }

  toggleModuleNav(e: MouseEvent) {
    this.hamburgerClick.next(e);
  }

  private initToggleButton(button: HeaderButtonOptions) {
    if (button.data !== undefined) {
      button.class = button.data ? button.toggleOnClass : button.toggleOffClass;
      button.text = button.data ? button.toggleOnText : button.toggleOffText;
      button.icon = button.data ? button.toggleOnIcon : button.toggleOffIcon;
    }
  }

}
