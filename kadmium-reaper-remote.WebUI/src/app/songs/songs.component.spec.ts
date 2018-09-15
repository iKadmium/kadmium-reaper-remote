import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from "../services/notifications.service";
import { ReaperService, ReaperCommands } from "../services/reaper.service";
import { SongService } from "../services/song.service";
import { SongsComponent } from './songs.component';
import { MockComponent } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { StatusCode } from '../status-code.enum';
import { Song, SongData } from '../song';
import { FileReaderService } from '../services/file-reader.service';

describe('SongsComponent', () =>
{
    let component: SongsComponent;
    let fixture: ComponentFixture<SongsComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                SongsComponent,
                MockComponent(NgbProgressbar),
                MockComponent(FaIconComponent)
            ],
            imports: [
                RouterTestingModule
            ],
            providers: [
                {
                    provide: SongService, useValue: jasmine.createSpyObj<SongService>({
                        getSongs: Promise.resolve([]),
                        removeSong: Promise.resolve(),
                        postSong: Promise.resolve(),
                        putSong: Promise.resolve()
                    })
                },
                { provide: ReaperService, useValue: jasmine.createSpyObj<ReaperService>({ runCommand: Promise.resolve() }) },
                { provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) },
                {
                    provide: FileReaderService, useValue: jasmine.createSpyObj<FileReaderService>({
                        readAsText: Promise.resolve(""),
                        deserialize: Promise.resolve(null)
                    })
                }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SongsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('component', () =>
    {
        it('should create', () =>
        {
            expect(component).toBeTruthy();
        });
    });

    describe('init', () =>
    {
        it('should request the songs', () =>
        {
            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            component.ngOnInit();
            expect(songServiceMock.getSongs).toHaveBeenCalled();
        });

        it('should report an error if requesting the songs fails', () =>
        {
            let error = new Error("Aaaaargh!");
            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            songServiceMock.getSongs.and.throwError(error.message);

            component.ngOnInit();

            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        });
    });

    describe('activate', () =>
    {
        it('should create a new tab and call the song command', fakeAsync(() =>
        {
            let song = new Song();
            song.command = "lol";

            component.activate(song);

            let reaperServiceMock = TestBed.get(ReaperService) as jasmine.SpyObj<ReaperService>;
            expect(reaperServiceMock.runCommand).toHaveBeenCalledWith(ReaperCommands.OpenNewTab);
            tick();
            expect(reaperServiceMock.runCommand).toHaveBeenCalledWith(song.command);
        }));

        it('should log an error if activation fails', fakeAsync(() =>
        {
            let song = new Song();
            song.command = "lol";

            let error = new Error("Error! Awooga!");
            let reaperServiceMock = TestBed.get(ReaperService) as jasmine.SpyObj<ReaperService>;
            reaperServiceMock.runCommand.and.throwError(error.message);
            component.activate(song);

            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        }));
    });

    describe('delete', () =>
    {
        it('should confirm deletion', () =>
        {
            let spy = spyOn(window, "confirm");
            component.songs = [new Song()];
            component.delete(0);
            expect(spy).toHaveBeenCalled();
        });

        it('should call the API delete if confirmed', fakeAsync(() =>
        {
            let index = 0;
            let spy = spyOn(window, "confirm");
            component.songs = [new Song()];
            spy.and.returnValue(true);

            let song = component.songs[index];
            component.delete(index);
            tick();

            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            expect(songServiceMock.removeSong).toHaveBeenCalledWith(song.id);
            expect(component.songs).not.toContain(song);
        }));

        it('should NOT call the API delete if not confirmed', () =>
        {
            let index = 0;
            let spy = spyOn(window, "confirm");
            component.songs = [new Song()];
            spy.and.returnValue(false);

            let song = component.songs[index];
            component.delete(index);

            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            expect(songServiceMock.removeSong).not.toHaveBeenCalled();
            expect(component.songs).toContain(song);
        });
    });

    describe('importFilesSelected', () =>
    {
        it('should add the files it does not have', fakeAsync(() =>
        {
            let songData: SongData = {
                command: "",
                duration: "",
                id: undefined,
                name: "Never Gonna Give You Up"
            };
            let songDatas = [songData];
            let fileReaderServiceMock = TestBed.get(FileReaderService) as jasmine.SpyObj<FileReaderService>;
            fileReaderServiceMock.deserialize.and.returnValue(songDatas);

            component.songs = [];
            let files: File[] = [new File(["lol"], "lol.json")];
            component.importFilesSelected(files);
            tick();

            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            let song = new Song();
            song.load(songData);
            expect(songServiceMock.postSong).toHaveBeenCalledWith(song);
            tick();

            expect(component.songs).toContain(song);
        }));

        it('should not add the files it already has', fakeAsync(() =>
        {
            let songData: SongData = {
                command: "",
                duration: "",
                id: undefined,
                name: "Never Gonna Give You Up"
            };
            let songDatas = [songData];
            let fileReaderServiceMock = TestBed.get(FileReaderService) as jasmine.SpyObj<FileReaderService>;
            fileReaderServiceMock.deserialize.and.returnValue(songDatas);

            let song = new Song();
            song.load(songData);
            component.songs = [song];
            let files: File[] = [new File(["lol"], "lol.json")];
            component.importFilesSelected(files);
            tick();

            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;

            expect(songServiceMock.postSong).not.toHaveBeenCalled();
            tick();
        }));

        it('should report an error if posting throws one', fakeAsync(() =>
        {
            let songData: SongData = {
                command: "",
                duration: "",
                id: undefined,
                name: "Never Gonna Give You Up"
            };
            let fileReaderServiceMock = TestBed.get(FileReaderService) as jasmine.SpyObj<FileReaderService>;
            fileReaderServiceMock.deserialize.and.returnValue([songData]);

            component.songs = [];
            let files: File[] = [new File(["lol"], "lol.json")];
            component.importFilesSelected(files);

            let error = new Error("Error!");
            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            songServiceMock.postSong.and.throwError(error.message);
            tick();

            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        }));

        it('should not add any items if the file list is empty', fakeAsync(() =>
        {
            let files: File[] = [];
            component.importFilesSelected(files);

            let fileReaderServiceMock = TestBed.get(FileReaderService) as jasmine.SpyObj<FileReaderService>;
            expect(fileReaderServiceMock.deserialize).not.toHaveBeenCalled();
        }));
    });

    describe('keymapFilesSelected', () =>
    {
        it('should not call the file reader if the file list is empty', fakeAsync(() =>
        {
            let files: File[] = [];
            component.keymapFilesSelected(files);

            let fileReaderServiceMock = TestBed.get(FileReaderService) as jasmine.SpyObj<FileReaderService>;
            expect(fileReaderServiceMock.readAsText).not.toHaveBeenCalled();
        }));

        it('should deserialize the file list', fakeAsync(() =>
        {
            let files: File[] = [new File([], "file.json")];
            component.keymapFilesSelected(files);

            let fileReaderServiceMock = TestBed.get(FileReaderService) as jasmine.SpyObj<FileReaderService>;
            expect(fileReaderServiceMock.readAsText).toHaveBeenCalledWith(files[0]);
        }));

        it('should call the mass import with the contents', fakeAsync(() =>
        {
            let files: File[] = [new File([], "file.json")];
            let fileReaderServiceMock = TestBed.get(FileReaderService) as jasmine.SpyObj<FileReaderService>;
            let contents = "lol";
            fileReaderServiceMock.readAsText.and.returnValue(contents);
            let spy = spyOn(component, "massImportCommands");
            component.keymapFilesSelected(files);
            tick();

            expect(spy).toHaveBeenCalledWith(contents);
        }));
    });

    describe('massImportCommands', () =>
    {
        it('should add commands for matching songs', () =>
        {
            let song = new Song();
            song.name = "Song";
            let command = 'RSda19b193b795a7725a5854004979bc019bc2e1f2';
            let fileText = `SCR 4 0 ${command} "Custom: Open ${song.name}.lua" "Open ${song.name}.lua"`;

            component.songs = [song];
            component.massImportCommands(fileText);

            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            expect(song.command).toBe("_" + command);
            expect(songServiceMock.putSong).toHaveBeenCalledWith(song);
        });

        it('should not touch songs that already have the correct commands', () =>
        {
            let song = new Song();
            song.name = "Song";
            let command = 'RSda19b193b795a7725a5854004979bc019bc2e1f2';
            song.command = "_" + command;
            let fileText = `SCR 4 0 ${command} "Custom: Open ${song.name}.lua" "Open ${song.name}.lua"`;

            component.songs = [song];
            component.massImportCommands(fileText);

            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            expect(songServiceMock.putSong).not.toHaveBeenCalled();
        });

        it('should raise a warning if the song was not found', () =>
        {
            let song = new Song();
            song.name = "Song";
            let command = 'RSda19b193b795a7725a5854004979bc019bc2e1f2';
            song.command = "_" + command;
            let fileText = `SCR 4 0 ${command} "Custom: Open ${song.name}.lua" "Open ${song.name}.lua"`;

            component.songs = [];
            component.massImportCommands(fileText);

            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Warning, `${song.name} was not found.`)
        });
    });
});
