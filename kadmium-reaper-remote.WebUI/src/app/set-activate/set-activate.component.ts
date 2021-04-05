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
import { SettingsService } from 'app/services/settings.service';
import { TestingFileFrequency, SettingsData } from 'app/settings';
import * as moment from "moment";

@Component({
	selector: 'app-set-activate',
	templateUrl: './set-activate.component.html',
	styleUrls: ['./set-activate.component.css']
})
export class SetActivateComponent implements OnInit
{
	public StatusCode = StatusCode;
	public tasks: Task[] = [];
	public settings: Promise<SettingsData>;

	constructor(private title: Title,
		private route: ActivatedRoute,
		private notificationsService: NotificationsService,
		private setService: SetService,
		private settingsService: SettingsService,
		private reaperService: ReaperService) { }

	ngOnInit()
	{
		this.title.setTitle("Set Activate");
		let id = this.route.snapshot.params['id'];

		let loadSetTask = new Task("Loading Set");
		this.tasks.push(loadSetTask);
		try
		{
			this.settings = this.settingsService.get();
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

	public shouldLoadTestingFile(set: Set, settings: SettingsData): boolean
	{
		switch (settings.testingFileFrequency)
		{
			case TestingFileFrequency.Always:
				return true;
			case TestingFileFrequency.Never:
				return false;
			case TestingFileFrequency.OnShowDay:
				return set.date.startOf('day').isSame(moment().startOf('day'));
		}
	}

	public async activate(set: Set): Promise<void>
	{
		await this.runCommand(() => this.reaperService.runCommand(ReaperCommands.CloseAllTabs), "Closing Tabs");
		let firstTab = true;
		await this.runCommand(() => this.setService.activateVenue(set.venue), "Activating Lighting for Venue");
		const settings = await this.settings;
		if (this.shouldLoadTestingFile(set, settings))
		{
			await this.runCommand(() => this.reaperService.runCommand(settings.testingFileCommand), "Loading Testing File");
		}

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
