import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { XHRBackend } from "@angular/http";
import { SetService } from './set.service';
import { UrlService } from "./url.service";


describe('SetService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                SetService,
                {
                    provide: HttpClient, useValue: jasmine.createSpyObj<HttpClient>({
                        post: Promise.resolve(),
                        get: Promise.resolve(),
                        delete: Promise.resolve(),
                        put: Promise.resolve()
                    })
                },
                UrlService
            ],
            imports: [
                HttpClientModule
            ]
        });
    });

    it('should ...', inject([SetService], fakeAsync((service: SetService) =>
    {
        expect(service).toBeTruthy();
    })));
});
