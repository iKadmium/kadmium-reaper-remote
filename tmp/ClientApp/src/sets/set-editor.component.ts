import { Component, OnInit } from "@angular/core";
import { Set } from "./set";
import { SetService } from "./set.service";
import { SongService } from "../songs/song.service";
import { MessageBarService } from "../status/message-bar/message-bar.service";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { Song } from "../songs/song";

@Component({
    selector: 'set-editor',
    template: require('./set-editor.component.html'),
    providers: [SetService, SongService]
})
export class SetEditorComponent implements OnInit
{
    set: Set;
    allSongs: Song[]

    constructor(private route: ActivatedRoute, private title: Title,
        private messageBarService: MessageBarService, private setService: SetService, private songService: SongService)
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
            this.messageBarService.add("Error", reason);
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
            this.messageBarService.add("Success", "Successfully added set at " + this.set.venue);
            window.location.href = "/sets";
        }
        catch (reason)
        {
            this.messageBarService.add("Error", reason);
        }
    }
}
