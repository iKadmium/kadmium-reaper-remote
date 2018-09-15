import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReaperService } from './reaper.service';
import { UrlService } from "./url.service";
import { from } from '../../../node_modules/rxjs';


describe('ReaperService', () =>
{
    beforeEach(() =>
    {
        TestBed.configureTestingModule({
            providers: [
                ReaperService,
                { provide: HttpClient, useValue: jasmine.createSpyObj<HttpClient>({ post: from([]) }) },
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
            const service: ReaperService = TestBed.get(ReaperService);
            expect(service).toBeTruthy();
        });
    });

    describe('runCommand', () =>
    {
        it('should make a post request to the URL', () =>
        {
            const command = "thing";
            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            const service: ReaperService = TestBed.get(ReaperService);
            const urlServiceMock = TestBed.get(UrlService) as jasmine.SpyObj<UrlService>;
            const expectedUrl = urlServiceMock.getUrl("Reaper", command);
            service.runCommand(command);
            expect(httpClientMock.post).toHaveBeenCalledWith(expectedUrl, null);
        });
    });
});
