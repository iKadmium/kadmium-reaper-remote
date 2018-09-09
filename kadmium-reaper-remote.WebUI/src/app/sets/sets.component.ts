import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";

import { Set, SetData, SetSkeletonData, SetSkeleton } from "../set";
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
    public sets: Set[];
    private allSongs: Song[];

    constructor(private title: Title, private notificationsService: NotificationsService, private setService: SetService, private songService: SongService, private reaperService: ReaperService)
    {

    }

    ngOnInit(): void
    {
        try
        {
            this.title.setTitle("Sets");
            this.songService.getSongs().then(songs =>
            {
                this.allSongs = songs;
                this.setService.getSets(this.allSongs).then(sets => 
                {
                    this.sets = sets;
                    console.log(sets);
                })
            });

        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
    }

    public delete(index: number)
    {
        let set = this.sets[index];
        if (window.confirm("Are you sure you want to delete this set?"))
        {
            this.setService.removeSet(set).then(response =>
            {
                this.sets.splice(index, 1);
            })
        }
    }

}
