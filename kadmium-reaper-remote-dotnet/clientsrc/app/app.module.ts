import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlertModule, CollapseModule, ModalModule, BsDropdownModule } from "ngx-bootstrap";

import { ReaperComponent } from './reaper/reaper.component';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { SetsComponent } from "./sets/sets.component";
import { SetEditorComponent } from "./set-editor/set-editor.component";
import { SongsComponent } from "./songs/songs.component";
import { SongEditorComponent } from "./song-editor/song-editor.component";
import { SettingsComponent } from "./settings/settings.component";

import { UrlService } from "./url.service";
import { ToastModule } from "ng2-toastr/ng2-toastr";
import { NotificationsService } from "./notifications.service";
import { NotificationMenuComponent } from "./notification-menu/notification-menu.component";

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        SetsComponent,
        SetEditorComponent,
        SongsComponent,
        SongEditorComponent,
        SettingsComponent,
        ReaperComponent,
        NotificationMenuComponent
    ],
    imports: [
        BrowserModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'sets', pathMatch: 'full' },
            { path: 'reaper', component: ReaperComponent },
            { path: 'sets', component: SetsComponent },
            { path: 'sets/new', component: SetEditorComponent },
            { path: 'sets/:id', component: SetEditorComponent },
            { path: 'songs', component: SongsComponent },
            { path: 'songs/new', component: SongEditorComponent },
            { path: 'songs/:id', component: SongEditorComponent },
            { path: 'settings', component: SettingsComponent },
            { path: '**', redirectTo: 'sets' }
        ]),
        CollapseModule.forRoot(),
        AlertModule.forRoot(),
        ModalModule.forRoot(),
        ToastModule.forRoot(),
        BsDropdownModule.forRoot(),
        BrowserAnimationsModule
    ],
    providers: [NotificationsService, UrlService]
})
export class AppModule
{
}
