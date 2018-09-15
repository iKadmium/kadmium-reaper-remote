import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MockComponent } from 'ng-mocks';
import { NotificationsService } from '../services/notifications.service';
import { NotificationMenuComponent } from './notification-menu.component';

describe('NotificationMenuComponent', () =>
{
	let component: NotificationMenuComponent;
	let fixture: ComponentFixture<NotificationMenuComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule({
			declarations: [
				NotificationMenuComponent,
				MockComponent(FaIconComponent)
			],
			providers: [
				{
					provide: NotificationsService, useValue: {
						component: null,
						messages: []
					}
				}
			]
		});

		TestBed.overrideProvider(NgbModal, { useValue: jasmine.createSpyObj<NgbModal>({ open: Promise.resolve() }) });

		TestBed.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(NotificationMenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('component', () =>
	{
		it('should create', () =>
		{
			expect(component).toBeTruthy();
		});
	});

});
