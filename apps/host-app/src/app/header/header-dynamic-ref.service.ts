import { Injectable } from '@angular/core';
import { HeaderComponent } from './header.component';

@Injectable()
export class HeaderRefService {
    private sohoHeaderComponent?: HeaderComponent;

    public set instance(sohoHeaderComponent: HeaderComponent | undefined) {
        this.sohoHeaderComponent = sohoHeaderComponent;
    }

    public get instance(): HeaderComponent | undefined {
        return this.sohoHeaderComponent;
    }
}