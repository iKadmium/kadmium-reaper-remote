import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsService } from "../notifications.service";
import { SetService } from "../set.service";
import { SongService } from "../song.service";
import { SetsComponent } from './sets.component';
import { MockComponent } from 'ng-mocks';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';


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
            ]
        }).overrideComponent(SetsComponent, {
            set: {
                providers: [
                    { provide: SetService, useValue: jasmine.createSpyObj<SetService>({ getSets: Promise.resolve([]) }) },
                    { provide: SongService, useValue: jasmine.createSpyObj<SongService>({ getSongs: Promise.resolve([]) }) },
                    { provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) }
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SetsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
