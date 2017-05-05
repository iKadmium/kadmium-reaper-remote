import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../settings.service";
import { NotificationsService } from "../notifications.service";
import { StatusCode } from "../status-code.enum";

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css'],
    providers: [SettingsService]
})
export class NavMenuComponent implements OnInit
{
    public collapsed: boolean;
    public reaperUri: string;
    constructor(private settingsService: SettingsService, public notificationsService: NotificationsService) { }

    async ngOnInit(): Promise<void>
    {
        this.collapsed = true;
        try
        {
            let settings = await this.settingsService.get();
            this.reaperUri = settings.reaperURI;
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
    }

}
