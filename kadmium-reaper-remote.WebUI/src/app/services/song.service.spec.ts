import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { SongService } from './song.service';
import { UrlService } from "./url.service";
import { from } from '../../../node_modules/rxjs';
import { SongData, Song } from '../song';

describe('SongService', () =>
{
    let songData: SongData;

    beforeEach(() =>
    {
        songData = {
            command: "",
            duration: "",
            id: 1,
            name: ""
        };

        TestBed.configureTestingModule({
            providers: [
                SongService,
                {
                    provide: HttpClient, useValue: jasmine.createSpyObj<HttpClient>({
                        get: from([]),
                        post: from([]),
                        put: from([]),
                        delete: from([])
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
            const service: SongService = TestBed.get(SongService);
            expect(service).toBeTruthy();
        });
    });

    describe('getSong', () =>
    {
        it('should make a get request to the appropriate url', () =>
        {
            const id = 5;
            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            httpClientMock.get.and.returnValue(from([songData]));
            const service: SongService = TestBed.get(SongService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Song", null, id);
            service.getSong(id);
            expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);
        });
    });

    describe('getSongs', () =>
    {
        it('should make a get request to the appropriate url', () =>
        {
            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            httpClientMock.get.and.returnValue(from([[songData]]));
            const service: SongService = TestBed.get(SongService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Song");
            service.getSongs();
            expect(httpClientMock.get).toHaveBeenCalledWith(expectedUrl);
        });
    });

    describe('postSong', () =>
    {
        it('should make a post request to the appropriate url', () =>
        {
            const set = new Song();

            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            const service: SongService = TestBed.get(SongService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Song");
            service.postSong(set);
            expect(httpClientMock.post).toHaveBeenCalledWith(expectedUrl, set.serialize());
        });
    });

    describe('putSong', () =>
    {
        it('should make a put request to the appropriate url', () =>
        {
            const set = new Song();

            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            const service: SongService = TestBed.get(SongService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Song", null, set.id);
            service.putSong(set);
            expect(httpClientMock.put).toHaveBeenCalledWith(expectedUrl, set.serialize());
        });
    });

    describe('removeSong', () =>
    {
        it('should make a put request to the appropriate url', () =>
        {
            const id = 5;

            const httpClientMock = TestBed.get(HttpClient) as jasmine.SpyObj<HttpClient>;
            const service: SongService = TestBed.get(SongService);
            const urlServiceMock: UrlService = TestBed.get(UrlService);
            const expectedUrl = urlServiceMock.getUrl("Song", null, id);
            service.removeSong(id);
            expect(httpClientMock.delete).toHaveBeenCalledWith(expectedUrl);
        });
    });
});
