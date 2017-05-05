import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
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
  song: Song;

  constructor(private route: ActivatedRoute, private title: Title,
    private notificationsService: NotificationsService, private songService: SongService)
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
      this.notificationsService.add(StatusCode.Error, reason);
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
      this.notificationsService.add(StatusCode.Success, "Successfully added " + this.song.name);
      window.location.href = "/songs";
    }
    catch (reason)
    {
      this.notificationsService.add(StatusCode.Error, reason);
    }
  }
}
