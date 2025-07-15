import { Injectable } from '@angular/core';

import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  public Title = new BehaviorSubject<string>("");

  private app?: string;

  private pageTitle?: string;

  private appMap?: Map<string, any>;

  constructor() {
  }

  setTitle(value: string, app: string | undefined = undefined) {
    this.app = app;
    this.pageTitle = value;
    this.updateTitle();
  }

  setApps(apps: any[]) {
    const appMap = new Map<string, any>();
    apps.forEach(app => {
      const id: string = app["id"];
      appMap.set(id, app);
    })
    this.appMap = appMap;
    this.updateTitle();
  }

  private updateTitle() {
    const appTitle = this.getAppTitle();
    if (appTitle) {
      const titleValue = `${appTitle} - ${this.pageTitle}`
      this.Title.next(titleValue);
    } else {
      this.Title.next(this.pageTitle || "");
    }
  }

  private getAppTitle() {
    if (this.app && this.appMap) {
      const meta = this.appMap.get(this.app);
      return meta ? meta["title"] : this.app;
    } else {
      return undefined;
    }
  }
}
