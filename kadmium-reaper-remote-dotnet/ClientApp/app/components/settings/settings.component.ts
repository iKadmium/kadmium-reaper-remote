import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NgModule, OnInit } from '@angular/core';

import { SettingsService } from "./settings.service";
import { Settings } from "./settings";
import { Title } from "@angular/platform-browser";
import { MessageBarService } from "../status/message-bar/message-bar.service";

var $ = require("jquery");

@Component({
    selector: 'songs',
    template: require('./settings.component.html'),
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
        let data = await this.settingsService.get();
        this.settings.load(data);
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