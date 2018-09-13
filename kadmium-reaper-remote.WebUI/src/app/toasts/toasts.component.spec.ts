import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastsComponent } from './toasts.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsService } from '../notifications.service';
import { MockComponent } from 'ng-mocks';
import { ToastComponent } from '../toast/toast.component';

describe('ToastsComponent', () =>
{
	let component: ToastsComponent;
	let fixture: ComponentFixture<ToastsComponent>;

	beforeEach(async(() =>
	{
		TestBed.configureTestingModule({
			declarations: [
				ToastsComponent,
				MockComponent(ToastComponent)
			],
			imports: [NoopAnimationsModule],
			providers: [
				{ provide: NotificationsService, useValue: {} }
			]
		}).compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(ToastsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () =>
	{
		expect(component).toBeTruthy();
	});
});
