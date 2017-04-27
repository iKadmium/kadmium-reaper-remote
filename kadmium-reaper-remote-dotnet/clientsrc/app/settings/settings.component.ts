import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

import { SettingsService } from "../settings.service";
import { Settings } from "../settings";

import { MessageBarService } from "../message-bar.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [SettingsService]
})
export class SettingsComponent implements OnInit
{

  settings: Settings;

  constructor(private settingsService: SettingsService, private title: Title, private messageBarService: MessageBarService)
  {
    this.settings = new Settings();
  }

  async ngOnInit(): Promise<void>
  {
    this.title.setTitle("Settings");
    try
    {
      let data = await this.settingsService.get();
      this.settings.load(data);
    }
    catch (reason)
    {
      this.messageBarService.add("Error", reason);
    }
  }

  public async save(): Promise<void>
  {
    try
    {
      await this.settingsService.save(this.settings);
      this.messageBarService.add("Success", "Successfully saved settings");
    }
    catch (reason)
    {
      this.messageBarService.add("Error", reason);
    }
  }

}
