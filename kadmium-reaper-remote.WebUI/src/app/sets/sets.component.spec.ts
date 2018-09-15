import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { MockComponent } from 'ng-mocks';
import { NotificationsService } from "../services/notifications.service";
import { SetService } from "../services/set.service";
import { SongService } from "../services/song.service";
import { SetsComponent } from './sets.component';
import { StatusCode } from '../status-code.enum';
import { Set } from '../set';

describe('SetsComponent', () =>
{
    let component: SetsComponent;
    let fixture: ComponentFixture<SetsComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                SetsComponent,
                MockComponent(NgbProgressbar),
                MockComponent(FaIconComponent)
            ],
            imports: [
                RouterTestingModule
            ],
            providers: [
                {
                    provide: SetService, useValue: jasmine.createSpyObj<SetService>({
                        getSets: Promise.resolve([]),
                        removeSet: Promise.resolve()
                    })
                },
                { provide: SongService, useValue: jasmine.createSpyObj<SongService>({ getSongs: Promise.resolve([]) }) },
                { provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SetsComponent);
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
            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            fixture.detectChanges();
            expect(songServiceMock.getSongs).toHaveBeenCalled();
        });

        it('should report an error if requesting the songs failed', () =>
        {
            let error = new Error("Message");
            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            let songServiceMock = TestBed.get(SongService) as jasmine.SpyObj<SongService>;
            songServiceMock.getSongs.and.throwError(error.message);
            fixture.detectChanges();
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        });

        it('should request the set', fakeAsync(() =>
        {
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            fixture.detectChanges();
            tick();
            expect(setServiceMock.getSets).toHaveBeenCalled();
        }));

        it('should report an error if requesting the songs failed', fakeAsync(() =>
        {
            let error = new Error("Message");
            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            setServiceMock.getSets.and.throwError(error.message);
            fixture.detectChanges();
            tick();
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        }));
    });

    describe('delete', () =>
    {
        beforeEach(() =>
        {
            component.sets = [new Set(), new Set()];
            component.sets[0].id = 1;
            component.sets[1].id = 2;
        });

        it('should open a confirmation window', () =>
        {
            let index = 0;
            let spy = spyOn(window, "confirm");
            component.delete(index);
            expect(spy).toHaveBeenCalled();
        });

        it('should ask the API to delete the set if the user confirms', () =>
        {
            let index = 0;
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            let set = component.sets[index];
            let spy = spyOn(window, "confirm");
            spy.and.returnValue(true);
            component.delete(index);
            expect(setServiceMock.removeSet).toHaveBeenCalledWith(set.id);
        });

        it('should NOT ask the API to delete the set if the user cancels', () =>
        {
            let index = 0;
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            let spy = spyOn(window, "confirm");
            spy.and.returnValue(false);
            component.delete(index);
            expect(setServiceMock.removeSet).not.toHaveBeenCalled();
        });
    });

});
