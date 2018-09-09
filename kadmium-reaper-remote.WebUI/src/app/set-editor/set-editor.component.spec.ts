import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetEditorComponent } from './set-editor.component';
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing"
import { SetService, MockSetService } from "../set.service";
import { SongService, MockSongService } from "../song.service";
import { NotificationsService } from "../notifications.service";

describe('SetEditorComponent', () =>
{
    let component: SetEditorComponent;
    let fixture: ComponentFixture<SetEditorComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [SetEditorComponent],
            imports: [
                FormsModule,
                RouterTestingModule
            ]
        }).overrideComponent(SetEditorComponent, {
            set: {
                providers: [
                    { provide: SetService, useClass: MockSetService },
                    { provide: SongService, useClass: MockSongService },
                    NotificationsService
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(SetEditorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
