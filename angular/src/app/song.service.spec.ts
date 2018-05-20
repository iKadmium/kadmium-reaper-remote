import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { SongService } from './song.service';
import { UrlService } from "./url.service";
import { HttpModule, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";

describe('SongService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                SongService,
                { provide: XHRBackend, useClass: MockBackend },
                UrlService
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('should ...', inject([SongService, XHRBackend], fakeAsync((service: SongService, backend: XHRBackend) =>
    {
        expect(service).toBeTruthy();
    })));
});
