import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';
import { ReaperService, ReaperCommands } from '../services/reaper.service';
import { SetService } from '../services/set.service';
import { SongService } from '../services/song.service';
import { Set } from '../set';
import { Song } from '../song';
import { StatusCode } from '../status-code.enum';

@Component({
	selector: 'app-set-activate',
	templateUrl: './set-activate.component.html',
	styleUrls: ['./set-activate.component.css']
})
export class SetActivateComponent implements OnInit
{
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

		let loadSetTask = new Task("Loading Set");
		this.tasks.push(loadSetTask);
		try
		{
			this.setService.getSet(id).then(set =>
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
		await this.runCommand(() => this.reaperService.runCommand(ReaperCommands.CloseAllTabs), "Closing Tabs");
		let firstTab = true;
		await this.runCommand(() => this.setService.activateVenue(set.venue), "Activating Lighting for Venue");

		for (let entry of set.entries)
		{
			if (!firstTab)
			{
				await this.runCommand(() => this.reaperService.runCommand(ReaperCommands.OpenNewTab), "Opening New Tab");
			}
			else
			{
				firstTab = false;
			}
			await this.runCommand(() => this.reaperService.runCommand(entry.song.command), `Opening ${entry.song.name}`);
		}
	}
}

class Task
{
	public status: StatusCode = StatusCode.Unknown;
	constructor(public name: string)
	{
	}
}
