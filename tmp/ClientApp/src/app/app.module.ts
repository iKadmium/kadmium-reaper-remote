import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component'
import { NavMenuComponent } from '../navmenu/navmenu.component';

import { SetsComponent } from '../sets/sets.component';
import { SongsComponent } from '../songs/songs.component';
import { SettingsComponent } from '../settings/settings.component';

import { SongService } from "../songs/song.service";
import { SetService } from "../sets/set.service";
import { SettingsService } from "../settings/settings.service";
import { MessageBarService } from "../status/message-bar/message-bar.service";
import { MessageBarComponent } from "../status/message-bar/message-bar.component";
import { SetEditorComponent } from "../sets/set-editor.component";
import { SongEditorComponent } from "../songs/song-editor.component";

import { AlertModule, CollapseModule, ModalModule } from "ngx-bootstrap";

import { SimpleNotificationsModule } from "angular2-notifications";

declare var jQuery: any;

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
        MessageBarComponent
    ],
    imports: [
        BrowserModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'sets', pathMatch: 'full' },
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
        //SimpleNotificationsModule.forRoot()
    ],
    providers: [MessageBarService]
})
export class AppModule
{
}
