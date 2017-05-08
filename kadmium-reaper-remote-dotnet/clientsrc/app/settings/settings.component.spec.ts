import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsComponent } from './settings.component';
import { MockSettingsService, SettingsService } from "../settings.service";
import { NotificationsService } from "../notifications.service";
import { FormsModule } from "@angular/forms";

describe('SettingsComponent', () =>
{
    let component: SettingsComponent;
    let fixture: ComponentFixture<SettingsComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SettingsComponent],
            imports: [FormsModule]
        }).overrideComponent(SettingsComponent, {
            set: {
                providers: [
                    { provide: SettingsService, useClass: MockSettingsService },
                    NotificationsService
                ]
            }
        }).compileComponents();
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
