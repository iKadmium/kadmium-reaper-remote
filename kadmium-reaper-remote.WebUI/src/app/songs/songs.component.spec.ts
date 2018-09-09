import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsComponent } from './songs.component';
import { MockReaperService, ReaperService } from "../reaper.service";
import { MockSongService, SongService } from "../song.service";
import { NotificationsService } from "../notifications.service";

describe('SongsComponent', () =>
{
    let component: SongsComponent;
    let fixture: ComponentFixture<SongsComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SongsComponent]
        }).overrideComponent(SongsComponent, {
            set: {
                providers: [
                    { provide: ReaperService, useClass: MockReaperService },
                    { provide: SongService, useClass: MockSongService },
                    NotificationsService
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
