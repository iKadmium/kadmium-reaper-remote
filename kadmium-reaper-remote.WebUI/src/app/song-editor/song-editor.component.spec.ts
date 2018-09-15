import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { MockComponent } from 'ng-mocks';
import { NotificationsService } from "../services/notifications.service";
import { SongService } from "../services/song.service";
import { SongEditorComponent } from './song-editor.component';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteMock } from '../test/route';
import { StatusCode } from '../status-code.enum';
import { Song } from '../song';

describe('SongEditorComponent', () =>
{
    let component: SongEditorComponent;
    let fixture: ComponentFixture<SongEditorComponent>;
    let routeMock: ActivatedRouteMock;

    beforeEach(async(() =>
    {
        routeMock = {
            snapshot: {
                params: {
                    id: 5
                }
            }
        };

        TestBed.configureTestingModule({
            declarations: [
                SongEditorComponent,
                MockComponent(FaIconComponent)
            ],
            imports: [
                FormsModule,
                RouterTestingModule
            ],
            providers: [
                {
                    provide: SongService, useValue: jasmine.createSpyObj<SongService>({
                        getSong: Promise.resolve(null),
                        putSong: Promise.resolve(),
                        postSong: Promise.resolve()
                    })
                },
                { provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) },
                { provide: ActivatedRoute, useValue: routeMock }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SongEditorComponent);
        component = fixture.componentInstance;
    });

    describe('component', () =>
    {
        it('should create', () =>
        {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });
    });

    describe('init', () =>
    {
        it('should request the song if given one', () =>
        {
            const id = 5;
            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            let activatedRouteMock = TestBed.get(ActivatedRoute) as ActivatedRouteMock;
            activatedRouteMock.snapshot.params.id = id;
            component.ngOnInit();
            expect(songServiceMock.getSong).toHaveBeenCalledWith(id);
        });

        it('should report an error if getting the song throws one', () =>
        {
            const id = 5;
            let activatedRouteMock = TestBed.get(ActivatedRoute) as ActivatedRouteMock;
            activatedRouteMock.snapshot.params.id = id;

            let error = new Error("Message");
            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            songServiceMock.getSong.and.throwError(error.message);

            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;

            component.ngOnInit();
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        });

        it('should create a new song if not given one', () =>
        {
            const id = null;
            component.song = null;
            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            let activatedRouteMock = TestBed.get(ActivatedRoute) as ActivatedRouteMock;
            activatedRouteMock.snapshot.params.id = id;
            component.ngOnInit();
            expect(songServiceMock.getSong).not.toHaveBeenCalled();
            expect(component.song).toBeTruthy();
        });
    });

    describe('save', () =>
    {
        it('should put the song if the id is not zero', () =>
        {
            component.song = new Song();
            component.song.id = 3;

            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;

            component.save();

            expect(songServiceMock.putSong).toHaveBeenCalledWith(component.song);
        });

        it('should post the song if the id is zero', () =>
        {
            component.song = new Song();
            component.song.id = 0;

            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;

            component.save();

            expect(songServiceMock.postSong).toHaveBeenCalledWith(component.song);
        });

        it('should report an error if putting the song throws one', () =>
        {
            component.song = new Song();
            component.song.id = 3;

            let error = new Error("Message");
            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            songServiceMock.putSong.and.throwError(error.message);
            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;

            component.save();

            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        });

        it('should report an error if posting the song throws one', () =>
        {
            component.song = new Song();
            component.song.id = 0;

            let error = new Error("Message");
            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            songServiceMock.postSong.and.throwError(error.message);
            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;

            component.save();

            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        });
    });

});
