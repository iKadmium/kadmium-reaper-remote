import { HttpErrorResponse } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../services/notifications.service';
import { ReaperService, ReaperCommands } from '../services/reaper.service';
import { SetService } from '../services/set.service';
import { SongService } from '../services/song.service';
import { Set } from '../set';
import { Song } from '../song';
import { StatusCode } from '../status-code.enum';
import { SongTestHelper } from '../test/song-test-helper';
import { SetActivateComponent } from './set-activate.component';
import { SettingsService } from 'app/services/settings.service';
import { SettingsData, TestingFileFrequency } from 'app/settings';
import moment = require('moment');

describe('SetActivateComponent', () =>
{
	let component: SetActivateComponent;
	let fixture: ComponentFixture<SetActivateComponent>;
	let route;
	let set: Set;
	let songs: Song[];
	let settings: SettingsData;

	beforeEach(async(() =>
	{
		settings = {
			httpPort: 80,
			lightingVenueURI: "",
			reaperURI: "",
			testingFileCommand: "testingFileCommand",
			testingFileFrequency: TestingFileFrequency.Always,
		}
		route = {
			snapshot: {
				params: {
					id: 5
				}
			}
		};

		set = new Set();
		songs = [SongTestHelper.getSong("First"), SongTestHelper.getSong("Seconds")];
		for (let song of songs)
		{
			set.addSong(song);
		}

		TestBed.configureTestingModule({
			declarations: [SetActivateComponent],
			providers: [
				{ provide: ReaperService, useValue: jasmine.createSpyObj<ReaperService>({ runCommand: Promise.resolve() }) },
				{ provide: SongService, useValue: jasmine.createSpyObj<SongService>({ getSongs: Promise.resolve(songs) }) },
				{
					provide: SetService, useValue: jasmine.createSpyObj<SetService>({
						getSet: Promise.resolve(set),
						activateVenue: Promise.resolve()
					})
				},
				{ provide: ActivatedRoute, useValue: route },
				{ provide: SettingsService, useValue: jasmine.createSpyObj<SettingsService>({ get: Promise.resolve(settings) }) },
				{ provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) },
				{ provide: Title, useValue: jasmine.createSpyObj<Title>({ setTitle: null }) }
			]
		});

		TestBed.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(SetActivateComponent);
		component = fixture.componentInstance;
	});

	describe('component', () =>
	{
		it('should create', () =>
		{
			fixture.detectChanges();
			expect(component).toBeTruthy();
		});

		describe('init', () =>
		{
			it('should set the title to Sets', () =>
			{
				let TitleMock = TestBed.get(Title) as jasmine.SpyObj<Title>;
				fixture.detectChanges();
				expect(TitleMock.setTitle).toHaveBeenCalledWith("Set Activate");
			});

			it('should try to load the set', () =>
			{
				let songServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
				fixture.detectChanges();
				expect(songServiceMock.getSet).toHaveBeenCalledWith(route.snapshot.params.id);
			});

			it("should report an error if it can't load the set", () =>
			{
				let error = new Error("Error");
				let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
				let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
				setServiceMock.getSet.and.throwError(error.message);
				fixture.detectChanges();
				expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
				expect(component.tasks.find(x => x.name == "Loading Set").status).toBe(StatusCode.Error);
			});

			it("should activate the set", fakeAsync(() =>
			{
				let spy = spyOn(component, "activate");
				fixture.detectChanges();
				fixture.detectChanges();
				tick();
				expect(spy).toHaveBeenCalled();
			}));
		});

		describe('activate', () =>
		{
			beforeEach(() =>
			{
				(component as any).allSongs = songs;
			});

			it('should close the tabs', (done) =>
			{
				component.settings = Promise.resolve(settings);
				component.activate(set).then(() =>
				{
					let reaperServiceMock = TestBed.get(ReaperService) as jasmine.SpyObj<ReaperService>;
					expect(reaperServiceMock.runCommand).toHaveBeenCalledWith(ReaperCommands.CloseAllTabs);
					expect(component.tasks.find(x => x.name == "Closing Tabs")).toBeTruthy();
					done();
				});
			});

			it("should report an error if it can't close the tabs", (done) =>
			{
				let error = new HttpErrorResponse({ error: "Error" });
				let reaperServiceMock = TestBed.get(ReaperService) as jasmine.SpyObj<ReaperService>;
				reaperServiceMock.runCommand.and.throwError(error.message);
				component.settings = Promise.resolve(settings);
				component.activate(set).then(() =>
				{
					expect(reaperServiceMock.runCommand).toHaveBeenCalledWith(ReaperCommands.CloseAllTabs);
					expect(component.tasks.find(x => x.name.startsWith("Closing Tabs")).status).toBe(StatusCode.Error);
					done();
				});
			});

			it('should activate lighting', (done) =>
			{
				let setService = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
				component.settings = Promise.resolve(settings);
				component.activate(set).then(() =>
				{
					expect(setService.activateVenue).toHaveBeenCalledWith(set.venue);
					expect(component.tasks.find(x => x.name == "Activating Lighting for Venue")).toBeTruthy();
					done();
				});
			});

			it("should report an error if it can't activate lighting", (done) =>
			{
				let error = new Error("Error");
				let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
				setServiceMock.activateVenue.and.throwError(error.message);
				component.settings = Promise.resolve(settings);
				component.activate(set).then(() =>
				{
					expect(setServiceMock.activateVenue).toHaveBeenCalledWith(set.venue);
					expect(component.tasks.find(x => x.name.startsWith("Activating Lighting for Venue")).status).toBe(StatusCode.Error);
					done();
				});
			});

			it('should activate each song in the set', (done) =>
			{
				let reaperService = TestBed.get(ReaperService) as jasmine.SpyObj<ReaperService>;
				component.settings = Promise.resolve(settings);
				component.activate(set).then(() =>
				{
					for (let entry of set.entries)
					{
						expect(reaperService.runCommand).toHaveBeenCalledWith(entry.song.command);
						expect(component.tasks.find(x => x.name == `Opening ${entry.song.name}`)).toBeTruthy();
					}
					done();
				});
			});

			it("should report an error if it can't activate each song", (done) =>
			{
				let error = new Error("Error");
				let reaperService = TestBed.get(ReaperService) as jasmine.SpyObj<ReaperService>;
				reaperService.runCommand.and.throwError(error.message);
				component.settings = Promise.resolve(settings);
				component.activate(set).then(() =>
				{
					for (let entry of set.entries)
					{
						expect(reaperService.runCommand).toHaveBeenCalledWith(entry.song.command);
						expect(component.tasks.find(x => x.name.startsWith(`Opening ${entry.song.name}`)).status).toBe(StatusCode.Error);
					}
					done();
				});
			});
		});

		describe('shouldLoadTestingFile', () =>
		{
			it('should return true if the frequency in the settings is set to always', () =>
			{
				settings.testingFileFrequency = TestingFileFrequency.Always;
				const result = component.shouldLoadTestingFile(set, settings);
				expect(result).toBeTruthy();
			});

			it('should return false if the frequency in the settings is set to never', () =>
			{
				settings.testingFileFrequency = TestingFileFrequency.Never;
				const result = component.shouldLoadTestingFile(set, settings);
				expect(result).toBeFalsy();
			});

			it('should return true if the frequency in the settings is set to on show day and the show day is today', () =>
			{
				settings.testingFileFrequency = TestingFileFrequency.OnShowDay;
				set.date = moment().startOf('day');
				const result = component.shouldLoadTestingFile(set, settings);
				expect(result).toBeTruthy();
			});

			it('should return false if the frequency in the settings is set to on show day and the show day is not today', () =>
			{
				settings.testingFileFrequency = TestingFileFrequency.OnShowDay;
				set.date = moment().add(1, 'years');
				const result = component.shouldLoadTestingFile(set, settings);
				expect(result).toBeFalsy();
			});
		})
	});
});
