import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Title } from "@angular/platform-browser";

import { Song } from "../song";

import { SongService } from "../song.service";
import { NotificationsService } from "../notifications.service";
import { StatusCode } from "../status-code.enum";

@Component({
    selector: 'app-song-editor',
    templateUrl: './song-editor.component.html',
    styleUrls: ['./song-editor.component.css'],
    providers: [SongService]
})
export class SongEditorComponent implements OnInit
{
    public song: Song;
    public busy: boolean = true;

    constructor(private route: ActivatedRoute, private title: Title,
        private notificationsService: NotificationsService, private songService: SongService, private router: Router)
    {

    }

    async ngOnInit(): Promise<void>
    {
        this.busy = true;
        let id = this.route.snapshot.params['id'];
        this.title.setTitle("Song Editor");
        try
        {
            if (id == null)
            {
                this.song = new Song();
            }
            else
            {
                this.song = await this.songService.getSong(id);
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
            if (this.song.id == 0)
            {
                await this.songService.postSong(this.song);
                this.notificationsService.add(StatusCode.Success, "Successfully added " + this.song.name);
            }
            else
            {
                await this.songService.putSong(this.song);
                this.notificationsService.add(StatusCode.Success, "Successfully edited " + this.song.name);
            }
            this.router.navigate(["../"]);
        }
        catch (reason)
        {
            this.notificationsService.add(StatusCode.Error, reason);
        }
        this.busy = false;
    }
}
