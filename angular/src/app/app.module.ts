import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ReaperComponent } from './reaper/reaper.component';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { SetsComponent } from "./sets/sets.component";
import { SetEditorComponent } from "./set-editor/set-editor.component";
import { SongsComponent } from "./songs/songs.component";
import { SongEditorComponent } from "./song-editor/song-editor.component";
import { SettingsComponent } from "./settings/settings.component";

import { UrlService } from "./url.service";
import { NotificationsService } from "./notifications.service";
import { NotificationMenuComponent } from "./notification-menu/notification-menu.component";
import { SetActivateComponent } from './set-activate/set-activate.component';
import { ToastComponent } from './toast/toast.component';
import { ToastsComponent } from './toasts/toasts.component';

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
        NotificationMenuComponent,
        SetActivateComponent,
        ToastComponent,
        ToastsComponent
    ],
    imports: [
        BrowserModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'sets', pathMatch: 'full' },
            { path: 'reaper', component: ReaperComponent },
            { path: 'sets', component: SetsComponent },
            { path: 'sets/new', component: SetEditorComponent },
            { path: 'sets/:id', component: SetEditorComponent },
            { path: 'sets/activate/:id', component: SetActivateComponent },
            { path: 'songs', component: SongsComponent },
            { path: 'songs/new', component: SongEditorComponent },
            { path: 'songs/:id', component: SongEditorComponent },
            { path: 'settings', component: SettingsComponent },
            { path: '**', redirectTo: 'sets' }
        ]),
        BrowserAnimationsModule,
        FontAwesomeModule,
        NgbModule.forRoot()
    ],
    providers: [NotificationsService, UrlService]
})
export class AppModule
{
}
