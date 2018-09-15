import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { NotificationMenuComponent } from "./notification-menu/notification-menu.component";
import { NotificationsService } from "./services/notifications.service";
import { UrlService } from "./services/url.service";
import { SetActivateComponent } from './set-activate/set-activate.component';
import { SetEditorComponent } from "./set-editor/set-editor.component";
import { SetsComponent } from "./sets/sets.component";
import { SettingsComponent } from "./settings/settings.component";
import { SongEditorComponent } from "./song-editor/song-editor.component";
import { SongsComponent } from "./songs/songs.component";
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
