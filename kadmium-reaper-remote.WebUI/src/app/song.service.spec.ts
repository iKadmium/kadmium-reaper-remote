import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { SongService } from './song.service';
import { UrlService } from "./url.service";
import { HttpModule, XHRBackend } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('SongService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                SongService,
                {
                    provide: HttpClient, useValue: jasmine.createSpyObj<HttpClient>({
                        get: Promise.resolve(),
                        post: Promise.resolve(),
                        put: Promise.resolve(),
                        delete: Promise.resolve()
                    })
                },
                UrlService
            ],
            imports: [
                HttpClientModule
            ]
        });
    });

    it('should ...', inject([SongService], fakeAsync((service: SongService) =>
    {
        expect(service).toBeTruthy();
    })));
});
