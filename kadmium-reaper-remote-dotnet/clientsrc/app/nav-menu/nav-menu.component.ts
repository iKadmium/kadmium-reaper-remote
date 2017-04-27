import { Component, OnInit } from '@angular/core';
import { SettingsService } from "../settings.service";
import { MessageBarService } from "../message-bar.service";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [SettingsService]
})
export class NavMenuComponent implements OnInit
{
  private reaperUri: string;
  constructor(private settingsService: SettingsService, private messageBarService: MessageBarService) { }

  async ngOnInit(): Promise<void>
  {
    try
    {
      let settings = await this.settingsService.get();
      this.reaperUri = settings.reaperURI;
    }
    catch (reason)
    {
      this.messageBarService.add("Error", reason);
    }
  }

}
