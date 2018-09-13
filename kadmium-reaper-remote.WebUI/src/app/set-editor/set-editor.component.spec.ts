import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SetEditorComponent } from './set-editor.component';
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing"
import { SetService } from "../set.service";
import { SongService } from "../song.service";
import { NotificationsService } from "../notifications.service";
import { MockComponent } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { StatusCode } from '../status-code.enum';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { Set } from '../set';

describe('SetEditorComponent', () =>
{
    let component: SetEditorComponent;
    let fixture: ComponentFixture<SetEditorComponent>;
    let route;
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
                { provide: SetService, useValue: jasmine.createSpyObj<SetService>({ getSet: Promise.resolve(null) }) },
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
            let id = 5;
            route.snapshot.params.id = id;
            let setServiceMock = TestBed.get(SetService) as jasmine.SpyObj<SetService>;
            fixture.detectChanges();
            tick();
            expect(setServiceMock.getSet).toHaveBeenCalledWith(id, sets);
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
    })


});
