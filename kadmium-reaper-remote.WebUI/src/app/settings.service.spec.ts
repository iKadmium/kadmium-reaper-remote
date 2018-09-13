import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';
import { SettingsService } from './settings.service';
import { UrlService } from "./url.service";


describe('SettingsService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                SettingsService,
                { provide: HttpClient, useValue: jasmine.createSpyObj<HttpClient>({ get: from([]), put: from([]) }) },
                UrlService
            ],
            imports: [
                HttpClientModule
            ]
        });
    });

    it('should ...', inject([SettingsService], fakeAsync((service: SettingsService) =>
    {
        expect(service).toBeTruthy();
    })));
});
