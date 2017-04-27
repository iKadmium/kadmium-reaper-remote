import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';

import { SetsComponent } from './components/sets/sets.component';
import { SongsComponent } from './components/songs/songs.component';
import { SettingsComponent } from './components/settings/settings.component';

import { SongService } from "./components/songs/song.service";
import { SetService } from "./components/sets/set.service";
import { SettingsService } from "./components/settings/settings.service";
import { MessageBarService } from "./components/status/message-bar/message-bar.service";
import { MessageBarComponent } from "./components/status/message-bar/message-bar.component";
import { SetEditorComponent } from "./components/sets/set-editor.component";
import { SongEditorComponent } from "./components/songs/song-editor.component";

//import { SimpleNotificationsModule } from "angular2-notifications";

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
        //SimpleNotificationsModule.forRoot()
    ],
    providers: [MessageBarService]
})
export class AppModule
{
}
