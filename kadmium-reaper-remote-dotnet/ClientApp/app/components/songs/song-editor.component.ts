import { Component, OnInit } from "@angular/core";
import { SongService } from "./song.service";
import { Song } from "./song";
import { MessageBarService } from "../status/message-bar/message-bar.service";
import { ActivatedRoute } from "@angular/router";
import { Title } from "@angular/platform-browser";

@Component({
    selector: 'song-editor',
    template: require('./song-editor.component.html'),
    providers: [SongService]
})
export class SongEditorComponent implements OnInit
{
    song: Song;

    constructor(private route: ActivatedRoute, private title: Title,
        private messageBarService: MessageBarService, private songService: SongService)
    {

    }

    async ngOnInit(): Promise<void>
    {
        let id = this.route.snapshot.params['id'];
        try
        {
            if (id == null)
            {
                this.title.setTitle("Song Editor - New");
                this.song = new Song();
            }
            else
            {
                this.song = await this.songService.getSong(id);
                this.title.setTitle("Set Editor - Editing " + this.song.name);
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
            if (this.song.id == 0)
            {
                await this.songService.postSong(this.song);
            }
            else
            {
                await this.songService.putSong(this.song);
            }
            this.messageBarService.add("Success", "Successfully added " + this.song.name);
            window.location.href = "/songs";
        }
        catch (reason)
        {
            this.messageBarService.add("Error", reason);
        }
    }
}