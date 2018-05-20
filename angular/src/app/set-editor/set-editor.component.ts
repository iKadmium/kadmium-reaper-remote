import { Component, OnInit } from '@angular/core';

import { Set } from "../set";
import { Song } from "../song";

import { SetService } from "../set.service";
import { SongService } from "../song.service";
import { ActivatedRoute, Router } from "@angular/router";
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
    public set: Set;
    public allSongs: Song[]

    public busy: boolean = true;

    constructor(private route: ActivatedRoute, private title: Title,
        private notificationsService: NotificationsService, private setService: SetService, private songService: SongService,
        private router: Router)
    {
        this.allSongs = [];
    }

    async ngOnInit(): Promise<void>
    {
        this.busy = true;
        try
        {
            this.allSongs = await this.songService.getSongs();
            this.title.setTitle("Set Editor");
            let id = this.route.snapshot.params['id'];
            if (id == null)
            {
                this.set = new Set();
            }
            else
            {
                this.set = await this.setService.getSet(id, this.allSongs);
            }
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
        this.busy = false;
    }

    async save(): Promise<void>
    {
        this.busy = true;
        try
        {
            if (this.set.id == 0)
            {
                await this.setService.postSet(this.set);
                this.notificationsService.add(StatusCode.Success, "Successfully added set at " + this.set.venue);
            }
            else
            {
                await this.setService.putSet(this.set);
                this.notificationsService.add(StatusCode.Success, "Successfully edited set at " + this.set.venue);
            }
            this.router.navigate(["../", { relativeTo: this.route }]);
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
        this.busy = false;
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