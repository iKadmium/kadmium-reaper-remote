import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'app/notifications.service';
import { ReaperService } from 'app/reaper.service';
import { Set } from 'app/set';
import { SetService } from 'app/set.service';
import { SongService } from 'app/song.service';
import { StatusCode } from 'app/status-code.enum';
import { Song } from '../song';

@Component({
	selector: 'app-set-activate',
	templateUrl: './set-activate.component.html',
	styleUrls: ['./set-activate.component.css']
})
export class SetActivateComponent implements OnInit
{
	private allSongs: Song[];
	public StatusCode = StatusCode;
	public tasks: Task[] = [];

	constructor(private title: Title,
		private route: ActivatedRoute,
		private notificationsService: NotificationsService,
		private setService: SetService,
		private songService: SongService,
		private reaperService: ReaperService) { }

	ngOnInit()
	{
		this.title.setTitle("Set Activate");
		let id = this.route.snapshot.params['id'];

		let loadSongsTask: Task = new Task("Loading Songs");
		this.tasks.push(loadSongsTask);

		try
		{
			this.songService.getSongs().then(songs =>
			{
				loadSongsTask.status = StatusCode.Success;
				this.allSongs = songs;

				let loadSetTask = new Task("Loading Set");
				this.tasks.push(loadSetTask);
				try
				{
					this.setService.getSet(id, this.allSongs).then(set =>
					{
						loadSetTask.status = StatusCode.Success;
						this.activate(set);
					});
				}
				catch (error)
				{
					this.notificationsService.add(StatusCode.Error, error);
					loadSetTask.status = StatusCode.Error;
				}
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
		let task = new Task(name);
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
			task.name += " - " + reason;
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

class Task
{
	constructor(public name: string, public status: StatusCode = StatusCode.Unknown)
	{
	}
}
