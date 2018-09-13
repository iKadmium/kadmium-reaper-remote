import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NotificationsService } from "../notifications.service";
import { SongService } from "../song.service";
import { SongEditorComponent } from './song-editor.component';
import { MockComponent } from 'ng-mocks';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';


describe('SongEditorComponent', () =>
{
    let component: SongEditorComponent;
    let fixture: ComponentFixture<SongEditorComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [
                SongEditorComponent,
                MockComponent(FaIconComponent)
            ],
            imports: [
                FormsModule,
                RouterTestingModule
            ]
        }).overrideComponent(SongEditorComponent, {
            set: {
                providers: [
                    { provide: SongService, useValue: jasmine.createSpyObj<SongService>({ getSong: Promise.resolve(null) }) },
                    { provide: NotificationsService, useValue: jasmine.createSpyObj<NotificationsService>({ add: null }) }
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
