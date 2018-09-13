import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { NotificationsService } from "../notifications.service";
import { SettingsService } from "../settings.service";
import { UrlService } from "../url.service";
import { NavMenuComponent } from './nav-menu.component';
import { MockComponent } from 'ng-mocks';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NotificationMenuComponent } from '../notification-menu/notification-menu.component';
import { StatusCode } from '../status-code.enum';

describe('NavMenuComponent', () =>
{
    let component: NavMenuComponent;
    let fixture: ComponentFixture<NavMenuComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                NavMenuComponent,
                MockComponent(NgbCollapse),
                MockComponent(FaIconComponent),
                MockComponent(NotificationMenuComponent)
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [
                { provide: SettingsService, useValue: jasmine.createSpyObj<SettingsService>({ get: Promise.resolve({ reaperUri: "" }) }) },
                { provide: UrlService, useValue: jasmine.createSpyObj<UrlService>({ getUrl: "" }) },
                { provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) }
            ]
        });

        TestBed.compileComponents()
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(NavMenuComponent);
        component = fixture.componentInstance;
    });

    describe('component', () =>
    {
        it('should create', () =>
        {
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should start out collapsed', () =>
        {
            fixture.detectChanges();
            expect(component.navbarCollapsed).toBeTruthy();
        })

        describe('init', () =>
        {
            it('should request the settings', () =>
            {
                const settingsServiceMock = TestBed.get(SettingsService) as jasmine.SpyObj<SettingsService>;
                fixture.detectChanges();
                expect(settingsServiceMock.get).toHaveBeenCalledTimes(1);
            });

            it('should report an error if getting the settings throws one', () =>
            {
                let error = new Error("Error");
                const settingsServiceMock = TestBed.get(SettingsService) as jasmine.SpyObj<SettingsService>;
                let notificationsServiceMock = TestBed.get(NotificationsService) as jasmine.SpyObj<NotificationsService>;
                settingsServiceMock.get.and.throwError(error.message);
                fixture.detectChanges();
                expect(notificationsServiceMock.add).toHaveBeenCalledWith(StatusCode.Error, error);
            })
        });

        describe('collapse button', () =>
        {
            it("should toggle the component's collapsed state", () =>
            {
                fixture.detectChanges();
                let togglerButton = (fixture.nativeElement as HTMLElement).querySelector(".navbar-toggler") as HTMLButtonElement;
                const initialState = component.navbarCollapsed;
                togglerButton.click();
                const newState = component.navbarCollapsed;
                expect(initialState).not.toEqual(newState);
            });
        })
    })

});
