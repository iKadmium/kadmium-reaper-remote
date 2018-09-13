import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from "../notifications.service";
import { ReaperService } from "../reaper.service";
import { SongService } from "../song.service";
import { SongsComponent } from './songs.component';
import { MockComponent } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';

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
            ]
        }).overrideComponent(SongsComponent, {
            set: {
                providers: [
                    { provide: SongService, useValue: jasmine.createSpyObj<SongService>({ getSongs: Promise.resolve([]) }) },
                    { provide: ReaperService, useValue: jasmine.createSpyObj<ReaperService>({ runCommand: Promise.resolve() }) },
                    { provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) }
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SongsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
