import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SetActivateComponent } from './set-activate.component';
import { ReaperService } from 'app/reaper.service';
import { SongService } from 'app/song.service';
import { SetService } from 'app/set.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'app/notifications.service';
import { Title } from '../../../node_modules/@angular/platform-browser';
import { StatusCode } from '../status-code.enum';
import { Set } from '../set';
import { Song } from '../song';
import { SongTestHelper } from '../test/song-test-helper';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';

describe('SetActivateComponent', () =>
{
	let component: SetActivateComponent;
	let fixture: ComponentFixture<SetActivateComponent>;
	let route;
	let set: Set;
	let songs: Song[];

	beforeEach(async(() =>
	{
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

			it('should try to load the songs', () =>
			{
				let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
				fixture.detectChanges();
				expect(songServiceMock.getSongs).toHaveBeenCalled();
			});

			it("should report an error if it can't load the songs", () =>
			{
				let error = new Error("Error");
				let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
				let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
				songServiceMock.getSongs.and.throwError(error.message);
				fixture.detectChanges();
				expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
				expect(component.tasks.find(x => x.name == "Loading Songs").status).toBe(StatusCode.Error);
			});

			it('should try to load the set', fakeAsync(() =>
			{
				let songServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
				fixture.detectChanges();
				tick();
				expect(songServiceMock.getSet).toHaveBeenCalledWith(route.snapshot.params.id, songs);
			}));

			it("should report an error if it can't load the set", fakeAsync(() =>
			{
				let error = new Error("Error");
				let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
				let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
				setServiceMock.getSet.and.throwError(error.message);
				fixture.detectChanges();
				tick();
				expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
				expect(component.tasks.find(x => x.name == "Loading Set").status).toBe(StatusCode.Error);
			}));

			it("should activate the set", fakeAsync(() =>
			{
				let spy = spyOn(component, "activate");
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
				component.activate(set).then(() =>
				{
					let reaperServiceMock = TestBed.get(ReaperService) as jasmine.SpyObj<ReaperService>;
					expect(reaperServiceMock.runCommand).toHaveBeenCalledWith("40886");
					expect(component.tasks.find(x => x.name == "Closing Tabs")).toBeTruthy();
					done();
				});
			});

			it("should report an error if it can't close the tabs", (done) =>
			{
				let error = new HttpErrorResponse({ error: "Error" });
				let reaperServiceMock = TestBed.get(ReaperService) as jasmine.SpyObj<ReaperService>;
				reaperServiceMock.runCommand.and.throwError(error.message);
				component.activate(set).then(() =>
				{
					expect(reaperServiceMock.runCommand).toHaveBeenCalledWith("40886");
					expect(component.tasks.find(x => x.name.startsWith("Closing Tabs")).status).toBe(StatusCode.Error);
					done();
				});
			});

			it('should activate lighting', (done) =>
			{
				let setService = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
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
				component.activate(set).then(() =>
				{
					for (let song of set.songs)
					{
						expect(reaperService.runCommand).toHaveBeenCalledWith(song.command);
						expect(component.tasks.find(x => x.name == `Opening ${song.name}`)).toBeTruthy();
					}
					done();
				});
			});

			it("should report an error if it can't activate each song", (done) =>
			{
				let error = new Error("Error");
				let reaperService = TestBed.get(ReaperService) as jasmine.SpyObj<ReaperService>;
				reaperService.runCommand.and.throwError(error.message);
				component.activate(set).then(() =>
				{
					for (let song of set.songs)
					{
						expect(reaperService.runCommand).toHaveBeenCalledWith(song.command);
						expect(component.tasks.find(x => x.name.startsWith(`Opening ${song.name}`)).status).toBe(StatusCode.Error);
					}
					done();
				});
			});
		});
	});
});
