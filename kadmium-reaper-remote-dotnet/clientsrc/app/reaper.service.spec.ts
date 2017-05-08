import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { ReaperService } from './reaper.service';
import { XHRBackend, HttpModule } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { UrlService } from "./url.service";

describe('ReaperService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                ReaperService,
                { provide: XHRBackend, useClass: MockBackend },
                UrlService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should ...', inject([ReaperService, XHRBackend], fakeAsync((service: ReaperService, backend: XHRBackend) =>
    {
        expect(service).toBeTruthy();
    })));
});
