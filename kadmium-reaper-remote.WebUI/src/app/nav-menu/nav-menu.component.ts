import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../services/settings.service";
import { NotificationsService } from "../services/notifications.service";
import { StatusCode } from "../status-code.enum";

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit
{
    public navbarCollapsed: boolean = true;
    public reaperUri: string;
    constructor(private settingsService: SettingsService, public notificationsService: NotificationsService) { }

    ngOnInit(): void
    {
        try
        {
            this.settingsService.get().then(settings =>
            {
                this.reaperUri = settings.reaperURI;
            })
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
    }

}
