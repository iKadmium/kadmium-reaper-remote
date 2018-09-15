import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { NotificationsService } from "../services/notifications.service";
import { Set } from "../set";
import { SetService } from "../services/set.service";
import { Song } from "../song";
import { SongService } from "../services/song.service";
import { StatusCode } from "../status-code.enum";



@Component({
    selector: 'app-sets',
    templateUrl: './sets.component.html',
    styleUrls: ['./sets.component.css']
})
export class SetsComponent implements OnInit
{
    public sets: Set[];
    private allSongs: Song[];

    constructor(private title: Title, private notificationsService: NotificationsService, private setService: SetService, private songService: SongService)
    {

    }

    ngOnInit(): void
    {
        this.title.setTitle("Sets");
        try
        {
            this.songService.getSongs().then(songs =>
            {
                this.allSongs = songs;
                try
                {
                    this.setService.getSets(this.allSongs).then(sets => 
                    {
                        this.sets = sets;
                    });
                }
                catch (error)
                {
                    this.notificationsService.add(StatusCode.Error, error);
                }
            });

        }
        catch (error)
        {
            this.notificationsService.add(StatusCode.Error, error);
        }
    }

    public delete(index: number)
    {
        let set = this.sets[index];
        if (window.confirm("Are you sure you want to delete this set?"))
        {
            this.setService.removeSet(set.id).then(response =>
            {
                this.sets.splice(index, 1);
            })
        }
    }

}
