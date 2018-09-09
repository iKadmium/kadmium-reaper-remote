import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongEditorComponent } from './song-editor.component';
import { FormsModule } from "@angular/forms";
import { MockSongService, SongService } from "../song.service";
import { RouterTestingModule } from "@angular/router/testing";
import { NotificationsService } from "../notifications.service";

describe('SongEditorComponent', () =>
{
    let component: SongEditorComponent;
    let fixture: ComponentFixture<SongEditorComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SongEditorComponent],
            imports: [
                FormsModule,
                RouterTestingModule
            ]
        }).overrideComponent(SongEditorComponent, {
            set: {
                providers: [
                    { provide: SongService, useClass: MockSongService },
                    NotificationsService
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SongEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
