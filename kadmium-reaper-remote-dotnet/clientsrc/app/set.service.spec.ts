import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { SetService } from './set.service';
import { UrlService } from "./url.service";
import { HttpModule, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

describe('SetService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                SetService,
                { provide: XHRBackend, useClass: MockBackend },
                UrlService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should ...', inject([SetService, XHRBackend], fakeAsync((service: SetService) =>
    {
        expect(service).toBeTruthy();
    })));
});
