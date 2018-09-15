import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { NotificationsService } from "../services/notifications.service";
import { SettingsService } from "../services/settings.service";
import { Settings } from "../settings";
import { StatusCode } from "../status-code.enum";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit
{
    public busy: boolean = false;
    public settings: Settings;

    constructor(private settingsService: SettingsService, private title: Title, private notificationsService: NotificationsService)
    {

    }

    async ngOnInit(): Promise<void>
    {
        this.title.setTitle("Settings");
        this.busy = true;
        try
        {
            let data = await this.settingsService.get();
            this.settings = new Settings();
            this.settings.load(data);
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
        this.busy = false;
    }

    public async save(): Promise<void>
    {
        try
        {
            this.busy = true;
            await this.settingsService.save(this.settings);
            this.notificationsService.add(StatusCode.Success, "Successfully saved settings");
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
        this.busy = false;
    }

}
