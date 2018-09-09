import { Component, OnInit } from '@angular/core';
import { SetService } from 'app/set.service';
import { SongService } from 'app/song.service';
import { ReaperService } from 'app/reaper.service';
import { SetSkeleton, Set } from 'app/set';
import { Title } from '@angular/platform-browser';
import { NotificationsService } from 'app/notifications.service';
import { StatusCode } from 'app/status-code.enum';
import { Song } from '../song';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-set-activate',
	templateUrl: './set-activate.component.html',
	styleUrls: ['./set-activate.component.css'],
	providers: [SetService, SongService, ReaperService]
})
export class SetActivateComponent implements OnInit
{
	private set: Set;
	private allSongs: Song[];
	public StatusCode = StatusCode;
	public tasks: Task[] = [];

	constructor(private title: Title, private route: ActivatedRoute, private notificationsService: NotificationsService, private setService: SetService, private songService: SongService, private reaperService: ReaperService) { }

	ngOnInit()
	{
		this.title.setTitle("Sets");
		let id = this.route.snapshot.params['id'];

		let loadSongsTask: Task = { name: "Loading Songs", status: StatusCode.Unknown };
		this.tasks.push(loadSongsTask);

		try
		{
			this.songService.getSongs().then(songs =>
			{
				loadSongsTask.status = StatusCode.Success;
				this.allSongs = songs;

				let loadSetTask: Task = { name: "Loading Set", status: StatusCode.Unknown };
				this.tasks.push(loadSetTask);
				this.setService.getSet(id, this.allSongs).then(set =>
				{
					loadSetTask.status = StatusCode.Success;
					this.activate(set);
				});
			});
		}
		catch (error)
		{
			this.notificationsService.add(StatusCode.Error, error);
			loadSongsTask.status = StatusCode.Error;
		}
	}

	private async runCommand(command: () => Promise<void>, name: string): Promise<void>
	{
		let task: Task = { name: name, status: StatusCode.Unknown };
		try
		{
			this.tasks.push(task);
			await command();
			task.status = StatusCode.Success;
		}
		catch (reason)
		{
			this.notificationsService.add(StatusCode.Error, reason);
			task.status = StatusCode.Error;
			if (reason instanceof HttpErrorResponse)
			{
				const errorResponse = reason as HttpErrorResponse;
				task.name += " - " + errorResponse.statusText;
			}
			else
			{
				task.name += " - " + reason;
			}
		}
	}

	public async activate(set: Set): Promise<void>
	{
		await this.runCommand(() => this.reaperService.runCommand("40886"), "Closing Tabs");
		let firstTab = true;
		await this.runCommand(() => this.setService.activateVenue(set.venue), "Activating Lighting for Venue");

		for (let song of set.songs)
		{
			if (!firstTab)
			{
				await this.runCommand(() => this.reaperService.runCommand("40859"), "Opening New Tab");
			}
			else
			{
				firstTab = false;
			}
			await this.runCommand(() => this.reaperService.runCommand(song.command), `Opening ${song.name}`);
		}
	}
}

interface Task
{
	name: string,
	status: StatusCode
}
