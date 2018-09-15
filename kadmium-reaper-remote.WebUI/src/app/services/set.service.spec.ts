import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { SetService } from './set.service';
import { UrlService } from "./url.service";
import { Set, SetData } from 'app/set';
import { from } from '../../../node_modules/rxjs';

describe('SetService', () =>
{
    let setData: SetData;

    beforeEach(() =>
    {
        setData = {
            date: "",
            id: 1,
            songs: [],
            venue: ""
        };

        TestBed.configureTestingModule({
            providers: [
                SetService,
                {
                    provide: HttpClient, useValue: jasmine.createSpyObj<HttpClient>({
                        post: from([]),
                        get: from([]),
                        delete: from([]),
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
            const service: SetService = TestBed.get(SetService);
            expect(service).toBeTruthy();
        });
    });

    describe('getSet', () =>
    {
        it('should make a get request to the appropriate url', () =>
        {
            const id = 5;
            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            httpClientMock.get.and.returnValue(from([setData]));
            const service: SetService = TestBed.get(SetService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Set", null, id);
            service.getSet(id);
            expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);
        });
    });

    describe('getSets', () =>
    {
        it('should make a get request to the appropriate url', () =>
        {
            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            httpClientMock.get.and.returnValue(from([[setData]]));
            const service: SetService = TestBed.get(SetService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Set");
            service.getSets([]);
            expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);
        });
    });

    describe('postSet', () =>
    {
        it('should make a post request to the appropriate url', () =>
        {
            const set = new Set();

            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            const service: SetService = TestBed.get(SetService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Set");
            service.postSet(set);
            expect(httpClientMock.post).toHaveBeenCalledWith(expectedUrl, set.serialize());
        });
    });

    describe('putSet', () =>
    {
        it('should make a put request to the appropriate url', () =>
        {
            const set = new Set();

            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            const service: SetService = TestBed.get(SetService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Set", null, set.id);
            service.putSet(set);
            expect(httpClientMock.put).toHaveBeenCalledWith(expectedUrl, set.serialize());
        });
    });

    describe('removeSet', () =>
    {
        it('should make a put request to the appropriate url', () =>
        {
            const id = 5;

            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            const service: SetService = TestBed.get(SetService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Set", null, id);
            service.removeSet(id);
            expect(httpClientMock.delete).toHaveBeenCalledWith(expectedUrl);
        });
    });

    describe('activateVenue', () =>
    {
        it('should make a put request to the appropriate url', () =>
        {
            const venue = "somewhere";

            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            const service: SetService = TestBed.get(SetService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Set", "activate", venue);
            service.activateVenue(venue);
            expect(httpClientMock.post).toHaveBeenCalledWith(expectedUrl, null);
        });
    });
});
