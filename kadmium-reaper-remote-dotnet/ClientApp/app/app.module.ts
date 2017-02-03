import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { HttpModule } from "@angular/http";
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';

import { SetsComponent } from './components/sets/sets.component';
import { SongsComponent } from './components/songs/songs.component';
import { SettingsComponent } from './components/settings/settings.component';

import { SongService } from "./components/songs/song.service";
import { SetService } from "./components/sets/set.service";
import { SettingsService } from "./components/settings/settings.service";

declare var jQuery: any;

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        SetsComponent,
        SongsComponent,
        SettingsComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'sets', pathMatch: 'full' },
            { path: 'sets', component: SetsComponent },
            { path: 'songs', component: SongsComponent },
            { path: 'settings', component: SettingsComponent },
            { path: '**', redirectTo: 'sets' }
        ])
    ],
    providers: [SetService, SongService]
})
export class AppModule
{
}
