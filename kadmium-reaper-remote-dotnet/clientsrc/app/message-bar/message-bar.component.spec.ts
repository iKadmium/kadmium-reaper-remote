import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBarComponent } from './message-bar.component';
import { CollapseModule, ModalModule } from "ngx-bootstrap";
import { NotificationsService } from "../notifications.service";
import { ToastModule } from "ng2-toastr/ng2-toastr";

describe('MessageBarComponent', () =>
{
    let component: MessageBarComponent;
    let fixture: ComponentFixture<MessageBarComponent>;

    beforeEach(async(() =>
    {
        TestBed.configureTestingModule({
            declarations: [MessageBarComponent],
            imports: [
                CollapseModule.forRoot(),
                ModalModule.forRoot(),
                ToastModule.forRoot()
            ],
            providers: [NotificationsService]
        })
            .compileComponents();
    }));

    beforeEach(() =>
    {
        fixture = TestBed.createComponent(MessageBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () =>
    {
        expect(component).toBeTruthy();
    });
});
