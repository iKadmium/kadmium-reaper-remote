import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { MockComponent } from 'ng-mocks';
import { NotificationsService } from "../services/notifications.service";
import { SettingsService } from "../services/settings.service";
import { SettingsComponent } from './settings.component';
import { StatusCode } from '../status-code.enum';

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
                {
                    provide: SettingsService, useValue: jasmine.createSpyObj<SettingsService>({
                        get: Promise.resolve(null),
                        save: Promise.resolve()
                    })
                },
                { provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) }
            ]
        });

        TestBed.compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SettingsComponent);
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
        it('should request the settings', () =>
        {
            let settingsServiceMock = TestBed.get(SettingsService) as jasmine.SpyObj<SettingsService>;
            fixture.detectChanges();
            expect(settingsServiceMock.get).toHaveBeenCalled();
        });

        it('should report an error if it cannot get the settings', () =>
        {
            let error = new Error("Error");
            let settingsServiceMock = TestBed.get(SettingsService) as jasmine.SpyObj<SettingsService>;
            settingsServiceMock.get.and.throwError(error.message);
            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            fixture.detectChanges();
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        });
    });

    describe('save', () =>
    {
        it('should call the API save', () =>
        {
            let settingsServiceMock = TestBed.get(SettingsService) as jasmine.SpyObj<SettingsService>;
            component.save();
            expect(settingsServiceMock.save).toHaveBeenCalled();
        });

        it('should report an error if saving fails', () =>
        {
            let error = new Error("Error");
            let settingsServiceMock = TestBed.get(SettingsService) as jasmine.SpyObj<SettingsService>;
            settingsServiceMock.save.and.throwError(error.message);
            let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
            component.save();
            expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
        });
    });

});
