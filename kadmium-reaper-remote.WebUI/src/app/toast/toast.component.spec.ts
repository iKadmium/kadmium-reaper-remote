import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { Status } from '../status';
import { StatusCode } from '../status-code.enum';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToastComponent', () =>
{
	let component: ToastComponent;
	let fixture: ComponentFixture<ToastComponent>;

	let status: Status;

	beforeEach(async(() =>
	{
		status = new Status(StatusCode.Info, "Working");

		TestBed.configureTestingModule({
			declarations: [
				ToastComponent
			],
			imports: [
				NoopAnimationsModule
			]
		})
			.compileComponents();
	}));

	beforeEach(() =>
	{
		fixture = TestBed.createComponent(ToastComponent);
		component = fixture.componentInstance;
		component.status = status;
		fixture.detectChanges();
	});

	it('should create', () =>
	{
		expect(component).toBeTruthy();
	});
});
