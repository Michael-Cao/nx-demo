import { HomeComponent } from './home/home.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { SettingsComponent } from './settings/settings.component';
import { AuditComponent } from './audit/audit.component';

export const appRoutes: Route[] = [
    { path: "", redirectTo: "home", pathMatch: "full" },
    { path: "home", component: HomeComponent, data: { title: "Home" } },
    { path: "audit", component: AuditComponent, data: { title: "Audit" } },
    { path: "project", component: ProjectComponent, data: { title: "Project" } },
    { path: "settings", component: SettingsComponent, data: { title: "Settings" } },
    { path: "products", component: SettingsComponent, data: { title: "Settings" } },
    { path: "products/:id", component: SettingsComponent, data: { title: "Settings" } },
];
