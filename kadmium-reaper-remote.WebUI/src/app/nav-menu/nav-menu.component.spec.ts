import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMenuComponent } from './nav-menu.component';

import { RouterTestingModule } from "@angular/router/testing";
import { Route } from "@angular/router";
import { MockSettingsService, SettingsService } from "../settings.service";
import { UrlService } from "../url.service";
import { NotificationsService } from "../notifications.service";

describe('NavMenuComponent', () =>
{
    let component: NavMenuComponent;
    let fixture: ComponentFixture<NavMenuComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [NavMenuComponent],
            imports: [
                RouterTestingModule.withRoutes([])
            ]
        }).overrideComponent(NavMenuComponent, {
            set: {
                providers: [
                    { provide: SettingsService, useClass: MockSettingsService },
                    UrlService,
                    NotificationsService
                ]
            }
        }).compileComponents()
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(NavMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
