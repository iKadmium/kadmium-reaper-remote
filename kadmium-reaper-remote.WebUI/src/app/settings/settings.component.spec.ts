import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { NotificationsService } from "../notifications.service";
import { SettingsService } from "../settings.service";
import { SettingsComponent } from './settings.component';
import { MockComponent } from 'ng-mocks';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';


describe('SettingsComponent', () =>
{
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                SettingsComponent,
                MockComponent(NgbProgressbar),
                MockComponent(FaIconComponent)
            ],
            imports: [FormsModule],
            providers: [
                { provide: SettingsService, useValue: jasmine.createSpyObj<SettingsService>({ get: Promise.resolve(null) }) },
                { provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
