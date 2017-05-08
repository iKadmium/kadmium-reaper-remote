import { Component, OnInit } from '@angular/core';

import { Set } from "../set";
import { Song } from "../song";

import { SetService } from "../set.service";
import { SongService } from "../song.service";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { NotificationsService } from "../notifications.service";
import { StatusCode } from "../status-code.enum";


@Component({
    selector: 'app-set-editor',
    templateUrl: './set-editor.component.html',
    styleUrls: ['./set-editor.component.css'],
    providers: [SetService, SongService]
})
export class SetEditorComponent implements OnInit
{

    set: Set;
    allSongs: Song[]

    constructor(private route: ActivatedRoute, private title: Title,
        private notificationsService: NotificationsService, private setService: SetService, private songService: SongService)
    {
        this.allSongs = [];
    }

    async ngOnInit(): Promise<void>
    {
        try
        {
            this.allSongs = await this.songService.getSongs();

            let id = this.route.snapshot.params['id'];
            if (id == null)
            {
                this.title.setTitle("Set Editor - New");
                this.set = new Set();
            }
            else
            {
                this.set = await this.setService.getSet(id, this.allSongs);
                this.title.setTitle("Set Editor - Editing " + this.set.venue);
            }
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
    }

    async save(): Promise<void>
    {
        try
        {
            if (this.set.id == 0)
            {
                await this.setService.postSet(this.set);
            }
            else
            {
                await this.setService.putSet(this.set);
            }
            this.notificationsService.add(StatusCode.Success, "Successfully added set at " + this.set.venue);
            window.location.href = "/sets";
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
    }

    private get getComparer(): (x: Song, y: Song) => boolean
    {

        return (x, y) =>
        {
            if (x == null && y == null)
            {
                return true;
            }
            else if ((x == null && y != null) || (x != null && y == null))
            {
                return false;
            }
            else
            {
                return x.id == y.id;
            }
        };
    }

}
