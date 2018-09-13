import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { ReaperService } from './reaper.service';
import { UrlService } from "./url.service";


describe('ReaperService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                ReaperService,
                { provide: HttpClient, useValue: jasmine.createSpyObj<HttpClient>({ post: Promise.resolve(null) }) },
                UrlService
            ],
            imports: [
                HttpClientModule
            ]
        });
    });

    it('should ...', inject([ReaperService], fakeAsync((service: ReaperService) =>
    {
        expect(service).toBeTruthy();
    })));
});
