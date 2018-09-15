import { TestBed } from '@angular/core/testing';
import { LocationService } from 'app/services/location.service';
import { UrlService } from './url.service';

describe('UrlService', () =>
{
	let location: URL;

	beforeEach(() =>
	{
		location = new URL("http://www.example.com");

		TestBed.configureTestingModule({
			providers: [
				{
					provide: LocationService, useValue: jasmine.createSpyObj<LocationService>({
						getBaseUrl: location
					})
				}
			]
		})
	});

	describe('service', () =>
	{
		it('should be created', () =>
		{
			const service: UrlService = TestBed.get(UrlService);
			expect(service).toBeTruthy();
		});
	});

	describe('getUrl', () =>
	{
		it('should return an index controller url', () =>
		{
			const service: UrlService = TestBed.get(UrlService);
			const returnedUrl = service.getUrl("Song", null, null);
			const url = new URL(returnedUrl);
			expect(url.toString()).toEqual("http://www.example.com/api/Song");
		});

		it('should return an index controller url when ngServed', () =>
		{
			const locationServiceMock = TestBed.get(LocationService) as jasmine.SpyObj<LocationService>;
			const service: UrlService = TestBed.get(UrlService);
			locationServiceMock.getBaseUrl.and.returnValue(new URL("https://localhost:4200"));
			const returnedUrl = service.getUrl("Song", null, null);
			const url = new URL(returnedUrl);
			expect(url.toString()).toEqual("https://localhost:80/api/Song");
		});

		it('should return an action controller url', () =>
		{
			const service: UrlService = TestBed.get(UrlService);
			const returnedUrl = service.getUrl("Song", "DoThing", null);
			const url = new URL(returnedUrl);
			expect(url.toString()).toEqual("http://www.example.com/api/Song/DoThing");
		});

		it('should return an id controller url', () =>
		{
			const service: UrlService = TestBed.get(UrlService);
			const returnedUrl = service.getUrl("Song", "DoThing", 3);
			const url = new URL(returnedUrl);
			expect(url.toString()).toEqual("http://www.example.com/api/Song/DoThing/3");
		});

		it('should return an index id controller url', () =>
		{
			const service: UrlService = TestBed.get(UrlService);
			const returnedUrl = service.getUrl("Song", null, 3);
			const url = new URL(returnedUrl);
			expect(url.toString()).toEqual("http://www.example.com/api/Song/3");
		});

		it('should return an index id controller url with a given scheme and port', () =>
		{
			const locationServiceMock = TestBed.get(LocationService) as jasmine.SpyObj<LocationService>;
			const service: UrlService = TestBed.get(UrlService);
			locationServiceMock.getBaseUrl.and.returnValue(new URL("https://www.example.com:1234"));
			const returnedUrl = service.getUrl("Song", null, 3);
			const url = new URL(returnedUrl);
			expect(url.toString()).toEqual("https://www.example.com:1234/api/Song/3");
		});
	});
});
