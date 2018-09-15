import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';
import { SettingsService } from './settings.service';
import { UrlService } from "./url.service";
import { Settings } from '../settings';


describe('SettingsService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                SettingsService,
                {
                    provide: HttpClient, useValue: jasmine.createSpyObj<HttpClient>({
                        get: from([]),
                        put: from([])
                    })
                },
                UrlService
            ],
            imports: [
                HttpClientModule
            ]
        });
    });

    describe('service', () =>
    {
        it('should be created', () =>
        {
            const service: SettingsService = TestBed.get(SettingsService);
            expect(service).toBeTruthy();
        });
    });

    describe('get', () =>
    {
        it('should make a get request to the appropriate url', () =>
        {
            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            const service: SettingsService = TestBed.get(SettingsService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Settings");
            service.get();
            expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);
        });
    });

    describe('save', () =>
    {
        it('should make a put request to the appropriate url', () =>
        {
            const settings = new Settings();
            settings.httpPort = 80;
            settings.lightingVenueURI = "http://www.example.com";
            settings.reaperURI = "http://www.example.com";

            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            const service: SettingsService = TestBed.get(SettingsService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Settings");
            service.save(settings);
            expect(httpClientMock.put).toHaveBeenCalledWith(expectedUrl, settings);
        });
    });
});
