import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

import { Set, SetData, SetSkeleton } from "../set";
import { Song, SongData } from "../song";

import { SetService } from "../set.service";
import { SongService } from "../song.service";
import { ReaperService } from "../reaper.service";
import { NotificationsService } from "../notifications.service";
import { StatusCode } from "../status-code.enum";

@Component({
    selector: 'app-sets',
    templateUrl: './sets.component.html',
    styleUrls: ['./sets.component.css'],
    providers: [SetService, SongService, ReaperService]
})
export class SetsComponent implements OnInit
{
    public sets: SetSkeleton[];
    private allSongs: Song[];

    constructor(private title: Title, private notificationsService: NotificationsService, private setService: SetService, private songService: SongService, private reaperService: ReaperService)
    {

    }

    async ngOnInit(): Promise<void>
    {
        try
        {
            this.title.setTitle("Sets");
            this.allSongs = await this.songService.getSongs();
            this.sets = await this.setService.getSets();
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
    }

    public async activate(skeleton: SetSkeleton): Promise<void>
    {
        await this.reaperService.runCommand("40886").catch(reason => this.notificationsService.add(StatusCode.Error, "Error closing tabs for " + skeleton.venue + ". " + reason)); //close all tabs
        let firstTab = true;
        let set = await this.setService.getSet(skeleton.id, this.allSongs);
        for (let song of set.songs)
        {
            if (!firstTab)
            {
                await this.reaperService.runCommand("40859").catch(reason => this.notificationsService.add(StatusCode.Error, "Error opening new tab for set " + skeleton.venue + ". " + reason)); //open a new tab
            }
            else
            {
                firstTab = false;
            }
            await this.reaperService.runCommand(song.command).catch(reason => this.notificationsService.add(StatusCode.Error, "Error opening song " + song.name + ". " + reason)); //open the song
        }
    }

    public delete(set: SetSkeleton)
    {
        if (window.confirm("Are you sure you want to delete this set?"))
        {
            this.setService.removeSet(set).then(response =>
            {
                let positions = this.sets.indexOf(set);
                this.sets.splice(positions, 1);
            })
        }
    }

}
