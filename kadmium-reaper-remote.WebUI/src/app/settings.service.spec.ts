import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { SettingsService } from './settings.service';
import { UrlService } from "./url.service";
import { XHRBackend, HttpModule } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

describe('SettingsService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                SettingsService,
                { provide: XHRBackend, useClass: MockBackend },
                UrlService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should ...', inject([SettingsService, XHRBackend], fakeAsync((service: SettingsService) =>
    {
        expect(service).toBeTruthy();
    })));
});
