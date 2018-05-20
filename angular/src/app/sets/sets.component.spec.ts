import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetsComponent } from './sets.component';
import { MockReaperService, ReaperService } from "../reaper.service";
import { MockSongService, SongService } from "../song.service";
import { MockSetService, SetService } from "../set.service";
import { NotificationsService } from "../notifications.service";

describe('SetsComponent', () =>
{
    let component: SetsComponent;
    let fixture: ComponentFixture<SetsComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                SetsComponent
            ]
        }).overrideComponent(SetsComponent, {
            set: {
                providers: [
                    { provide: SetService, useClass: MockSetService },
                    { provide: SongService, useClass: MockSongService },
                    { provide: ReaperService, useClass: MockReaperService },
                    NotificationsService
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
