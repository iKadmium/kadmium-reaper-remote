import { TestBed } from '@angular/core/testing';
import { Status } from '../status';
import { StatusCode } from '../status-code.enum';
import { ToastsComponent } from '../toasts/toasts.component';
import { NotificationsService } from './notifications.service';

describe('NotificationsService', () =>
{
	beforeEach(() => TestBed.configureTestingModule({}));

	describe('service', () =>
	{
		it('should be created', () =>
		{
			const service: NotificationsService = TestBed.get(NotificationsService);
			expect(service).toBeTruthy();
			expect(service.messages).toBeTruthy();
		});
	});

	describe('add', () =>
	{
		it('should add status messages', () =>
		{
			let status = new Status(StatusCode.Info, "Some info");
			const service: NotificationsService = TestBed.get(NotificationsService);
			service.add(status.statusCode, status.body);
			expect(service.messages).toContain(status);
		});

		it('should log errors as console errors', () =>
		{
			let status = new Status(StatusCode.Error, "Some error");
			const service: NotificationsService = TestBed.get(NotificationsService);
			let spy = spyOn(console, "error");
			service.add(status.statusCode, status.body);
			expect(spy).toHaveBeenCalledWith(status.body);
		});

		it('should log info as console log messages', () =>
		{
			let status = new Status(StatusCode.Info, "Some info");
			const service: NotificationsService = TestBed.get(NotificationsService);
			let spy = spyOn(console, "log");
			service.add(status.statusCode, status.body);
			expect(spy).toHaveBeenCalledWith(status.body);
		});

		it('should call the addToast if the component is not null', () =>
		{
			let status = new Status(StatusCode.Info, "Some info");
			const service: NotificationsService = TestBed.get(NotificationsService);
			let mockedComponent = jasmine.createSpyObj<ToastsComponent>({ addToast: null });
			service.toastsComponent = mockedComponent;
			service.add(status.statusCode, status.body);
			expect(mockedComponent.addToast).toHaveBeenCalledWith(status);
		});
	});
});
