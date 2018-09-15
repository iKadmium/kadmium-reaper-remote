import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ActivatedRouteMock } from '../test/route';
import { MockComponent } from 'ng-mocks';
import { NotificationsService } from "../services/notifications.service";
import { SetService } from "../services/set.service";
import { SongService } from "../services/song.service";
import { Set } from '../set';
import { Song } from '../song';
import { StatusCode } from '../status-code.enum';
import { SetEditorComponent } from './set-editor.component';

describe('SetEditorComponent', () =>
{
    let component: SetEditorComponent;
    let fixture: ComponentFixture<SetEditorComponent>;
    let route: ActivatedRouteMock;
    let sets: Set[];

    beforeEach(async(() =>
    {
        sets = [];

        route = {
            snapshot: {
                params: {
                    id: 5
                }
            }
        };

        TestBed.configureTestingModule({
            declarations: [
                SetEditorComponent,
                MockComponent(FaIconComponent)
            ],
            imports: [
                FormsModule,
                RouterTestingModule
            ],
            providers: [
                { provide: SongService, useValue: jasmine.createSpyObj<SongService>({ getSongs: Promise.resolve(sets) }) },
                {
                    provide: SetService, useValue: jasmine.createSpyObj<SetService>({
                        getSet: Promise.resolve(null),
                        putSet: Promise.resolve(),
                        postSet: Promise.resolve()
                    })
                },
                { provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) },
                { provide: ActivatedRoute, useValue: route }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SetEditorComponent);
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
        it('should request the songs', () =>
        {
            let SongServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            fixture.detectChanges();
            expect(SongServiceMock.getSongs).toHaveBeenCalled();
        });

        it('should report an error if requesting the songs fails', () =>
        {
            let error = new Error("Error");
            let SongServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            SongServiceMock.getSongs.and.throwError(error.message);
            fixture.detectChanges();
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        });

        it('should request the set if given one', fakeAsync(() =>
        {
            let id = 3;
            let activatedRouteMock = TestBed.get(ActivatedRoute) as ActivatedRouteMock;
            activatedRouteMock.snapshot.params.id = id;
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            fixture.detectChanges();
            tick();
            expect(setServiceMock.getSet).toHaveBeenCalledWith(id);
        }));

        it('should report an error if requesting the songs fails', fakeAsync(() =>
        {
            let error = new Error("Error");
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            setServiceMock.getSet.and.throwError(error.message);
            fixture.detectChanges();
            tick();
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        }));

        it('should not request the set if not given one', fakeAsync(() =>
        {
            let id = null;
            let activatedRouteMock = TestBed.get(ActivatedRoute) as ActivatedRouteMock;
            activatedRouteMock.snapshot.params.id = id;
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            fixture.detectChanges();
            tick();
            expect(setServiceMock.getSet).not.toHaveBeenCalled();
        }));
    });

    describe('save', () =>
    {
        it('should attempt to post the set if it is a new set', () =>
        {
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            component.set = new Set();
            component.set.id = 0;
            component.save();
            expect(setServiceMock.postSet).toHaveBeenCalledWith(component.set);
            expect(setServiceMock.putSet).not.toHaveBeenCalled();
        });

        it('should report an error if posting fails', () =>
        {
            let error = new Error("Message");
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            setServiceMock.postSet.and.throwError(error.message);
            component.set = new Set();
            component.set.id = 0;
            component.save();
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        });

        it('should attempt to put the set if it is not a new set', () =>
        {
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            component.set = new Set();
            component.set.id = 5;
            component.save();
            expect(setServiceMock.putSet).toHaveBeenCalledWith(component.set);
            expect(setServiceMock.postSet).not.toHaveBeenCalled();
        });

        it('should report an error if putting fails', () =>
        {
            let error = new Error("Message");
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            setServiceMock.putSet.and.throwError(error.message);
            component.set = new Set();
            component.set.id = 5;
            component.save();
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        });
    });

    describe('getComparer', () =>
    {
        it('should return true if two songs have the same id', () =>
        {
            let first = new Song();
            first.id = 4;
            let second = new Song();
            second.id = 4;
            const result = component.getComparer(first, second);
            expect(result).toBeTruthy();
        });

        it('should return false if two songs have different ids', () =>
        {
            let first = new Song();
            first.id = 4;
            let second = new Song();
            second.id = 5;
            const result = component.getComparer(first, second);
            expect(result).toBeFalsy();
        });

        it('should return true if two songs are both null', () =>
        {
            let first = null;
            let second = null;
            const result = component.getComparer(first, second);
            expect(result).toBeTruthy();
        });

        it('should return false if one song is null but the other is not', () =>
        {
            let first = null;
            let second = new Song();
            const result = component.getComparer(first, second);
            expect(result).toBeFalsy();
        });
    });
});

